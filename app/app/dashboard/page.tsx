import type { Metadata } from "next"
import { Users, Briefcase, TrendingUp, Target } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { MetricCard } from "@/components/dashboard/metric-card"
import { PipelineFunnel } from "@/components/dashboard/pipeline-funnel"
import { DealsByMonth } from "@/components/dashboard/deals-by-month"
import { UpcomingDeals } from "@/components/dashboard/upcoming-deals"
import { getActiveWorkspace } from "@/lib/workspace"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dashboard — PipeFlow CRM",
}

const PT_MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
const ACTIVE_STAGES = ["new_lead", "contacted", "proposal_sent", "negotiation"] as const

export default async function DashboardPage() {
  const { user, workspace, supabase } = await getActiveWorkspace()

  const wid = workspace.id
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const in7Days = new Date(today)
  in7Days.setDate(today.getDate() + 7)
  const sixMonthsAgo = new Date(today)
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)
  sixMonthsAgo.setDate(1)
  const todayStr = today.toISOString().split("T")[0]
  const in7DaysStr = in7Days.toISOString().split("T")[0]

  // All 7 queries run in parallel — including lead names for upcoming deals
  const [
    { count: leadsCount },
    { data: openDealsData },
    { count: wonCount },
    { count: lostCount },
    { data: upcomingRaw },
    { data: allDealsRaw },
    { data: upcomingLeads },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("workspace_id", wid),
    supabase.from("deals").select("value, stage").eq("workspace_id", wid).not("stage", "in", "(won,lost)"),
    supabase.from("deals").select("*", { count: "exact", head: true }).eq("workspace_id", wid).eq("stage", "won"),
    supabase.from("deals").select("*", { count: "exact", head: true }).eq("workspace_id", wid).eq("stage", "lost"),
    supabase
      .from("deals")
      .select("id, title, value, stage, due_date, lead_id")
      .eq("workspace_id", wid)
      .not("stage", "in", "(won,lost)")
      .gte("due_date", todayStr)
      .lte("due_date", in7DaysStr)
      .order("due_date"),
    supabase
      .from("deals")
      .select("stage, created_at")
      .eq("workspace_id", wid)
      .gte("created_at", sixMonthsAgo.toISOString()),
    // Pre-fetch lead names for upcoming deals using workspace scope
    supabase
      .from("leads")
      .select("id, name")
      .eq("workspace_id", wid),
  ])

  const openDeals = openDealsData ?? []
  const pipelineValue = openDeals.reduce((acc, d) => acc + (d.value ?? 0), 0)
  const won = wonCount ?? 0
  const lost = lostCount ?? 0
  const conversionRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : 0

  const funnelData = ACTIVE_STAGES.map((stage) => ({
    stage,
    count: openDeals.filter((d) => d.stage === stage).length,
  }))

  const dealsByMonth = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today)
    d.setMonth(d.getMonth() - (5 - i))
    const year = d.getFullYear()
    const month = d.getMonth()
    const count = (allDealsRaw ?? []).filter((deal) => {
      const created = new Date(deal.created_at)
      return created.getFullYear() === year && created.getMonth() === month
    }).length
    return { label: PT_MONTHS[month], count }
  })

  const leadNameMap = Object.fromEntries((upcomingLeads ?? []).map((l) => [l.id, l.name]))

  const upcomingDeals = (upcomingRaw ?? []).map((d) => ({
    id: d.id,
    title: d.title,
    value: d.value ?? null,
    stage: d.stage,
    due_date: d.due_date ?? null,
    leadName: d.lead_id ? (leadNameMap[d.lead_id] ?? null) : null,
  }))

  const userName =
    (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "Usuário"
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`${greeting}, ${userName}! Aqui está o resumo do seu pipeline.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Leads"
          value={String(leadsCount ?? 0)}
          icon={Users}
          iconColor="text-blue-500"
          iconBg="bg-blue-50"
        />
        <MetricCard
          title="Negócios Abertos"
          value={String(openDeals.length)}
          icon={Briefcase}
          iconColor="text-purple-500"
          iconBg="bg-purple-50"
        />
        <MetricCard
          title="Valor do Pipeline"
          value={formatCurrency(pipelineValue)}
          icon={TrendingUp}
          iconColor="text-green-500"
          iconBg="bg-green-50"
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${conversionRate}%`}
          icon={Target}
          iconColor="text-orange-500"
          iconBg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PipelineFunnel data={funnelData} />
        <DealsByMonth data={dealsByMonth} />
      </div>

      <UpcomingDeals deals={upcomingDeals} />
    </div>
  )
}
