import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { SettingsNav } from "@/components/settings/settings-nav"
import { BillingSection } from "@/components/settings/billing-section"

export const metadata: Metadata = {
  title: "Plano & Faturamento — PipeFlow CRM",
}

const ACTIVE_WORKSPACE_COOKIE = "piperflow_active_workspace"

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const cookieStore = await cookies()
  const activeId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value

  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("role, workspaces(id, name, plan, stripe_customer_id)")
    .eq("user_id", user.id)

  if (!memberships?.length) redirect("/onboarding")

  const activeMembership =
    (activeId && memberships.find((m) => {
      const ws = Array.isArray(m.workspaces) ? m.workspaces[0] : m.workspaces
      return ws?.id === activeId
    })) || memberships[0]

  const ws = Array.isArray(activeMembership.workspaces)
    ? activeMembership.workspaces[0]
    : activeMembership.workspaces

  if (!ws) redirect("/onboarding")

  const [{ count: leadsCount }, { count: membersCount }] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", ws.id),
    supabase
      .from("workspace_members")
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", ws.id),
  ])

  const params = await searchParams

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Gerencie seu workspace, membros e plano."
      />

      {params.success && (
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          Assinatura Pro ativada com sucesso! Obrigado.
        </div>
      )}
      {params.canceled && (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          Checkout cancelado. Você ainda está no plano Free.
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsNav />
        <div className="flex-1">
          <Card className="p-6">
            <BillingSection
              plan={ws.plan as "free" | "pro"}
              leadsCount={leadsCount ?? 0}
              membersCount={membersCount ?? 0}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
