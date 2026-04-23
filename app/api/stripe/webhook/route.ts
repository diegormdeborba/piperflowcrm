import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const admin = createAdminClient()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const workspaceId = session.metadata?.workspace_id
        if (!workspaceId) break

        await admin
          .from("workspaces")
          .update({
            plan: "pro",
            stripe_customer_id: session.customer as string,
          })
          .eq("id", workspaceId)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const workspaceId = subscription.metadata?.workspace_id
        if (!workspaceId) break

        await admin
          .from("workspaces")
          .update({ plan: "free" })
          .eq("id", workspaceId)
        break
      }

      case "invoice.payment_failed": {
        // Stripe faz retry automático via dunning — não revogamos o Pro aqui.
        // O downgrade real acontece quando customer.subscription.deleted é disparado.
        const invoice = event.data.object as Stripe.Invoice
        const workspaceId = (invoice as unknown as { subscription_details?: { metadata?: { workspace_id?: string } } })
          .subscription_details?.metadata?.workspace_id
        console.warn("[stripe/webhook] invoice.payment_failed — workspace:", workspaceId ?? "unknown")
        break
      }
    }
  } catch (err) {
    console.error("[stripe/webhook] handler error:", err)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
