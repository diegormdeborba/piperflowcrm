"use server"

import { redirect } from "next/navigation"

import { stripe } from "@/lib/stripe"
import { getActiveWorkspace } from "@/lib/workspace"
import { createAdminClient } from "@/lib/supabase/admin"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export async function createCheckoutSession(): Promise<{ error?: string }> {
  const { workspace } = await getActiveWorkspace()

  if (workspace.plan === "pro") {
    return { error: "Workspace já está no plano Pro." }
  }

  const priceId = process.env.STRIPE_PRO_PRICE_ID
  if (!priceId) return { error: "Plano Pro não configurado." }

  let customerId = workspace.stripe_customer_id ?? undefined

  // Cria customer no Stripe se ainda não existe
  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { workspace_id: workspace.id },
    })
    customerId = customer.id

    const admin = createAdminClient()
    await admin
      .from("workspaces")
      .update({ stripe_customer_id: customerId })
      .eq("id", workspace.id)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    // workspace_id necessário no webhook para saber qual workspace atualizar
    metadata: { workspace_id: workspace.id },
    subscription_data: { metadata: { workspace_id: workspace.id } },
    success_url: `${APP_URL}/app/settings/billing?success=1`,
    cancel_url: `${APP_URL}/app/settings/billing?canceled=1`,
  })

  if (!session.url) return { error: "Erro ao criar sessão de checkout." }

  redirect(session.url)
}

export async function createPortalSession(): Promise<{ error?: string }> {
  const { workspace } = await getActiveWorkspace()

  if (!workspace.stripe_customer_id) {
    return { error: "Nenhuma assinatura ativa encontrada." }
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: workspace.stripe_customer_id,
    return_url: `${APP_URL}/app/settings/billing`,
  })

  redirect(session.url)
}
