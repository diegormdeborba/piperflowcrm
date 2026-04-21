import type { Metadata } from "next"
import { Users, Briefcase, TrendingUp, Target } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { MetricCard } from "@/components/dashboard/metric-card"
import { PipelineFunnel } from "@/components/dashboard/pipeline-funnel"
import { DealsByMonth } from "@/components/dashboard/deals-by-month"
import { UpcomingDeals } from "@/components/dashboard/upcoming-deals"
import { MOCK_DEALS, MOCK_LEADS, MOCK_USER } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dashboard — PipeFlow CRM",
}

export default function DashboardPage() {
  const openDeals = MOCK_DEALS.filter((d) => d.stage !== "won" && d.stage !== "lost")
  const pipelineValue = openDeals.reduce((acc, d) => acc + (d.value ?? 0), 0)
  const wonDeals = MOCK_DEALS.filter((d) => d.stage === "won").length
  const lostDeals = MOCK_DEALS.filter((d) => d.stage === "lost").length
  const conversionRate =
    wonDeals + lostDeals > 0
      ? Math.round((wonDeals / (wonDeals + lostDeals)) * 100)
      : 0

  const today = new Date("2026-04-21")
  const in7Days = new Date("2026-04-28")
  const upcomingDeals = MOCK_DEALS.filter(
    (d) =>
      d.due_date &&
      new Date(d.due_date) >= today &&
      new Date(d.due_date) <= in7Days,
  ).sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())

  const hour = new Date("2026-04-21T10:00:00").getHours()
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`${greeting}, ${MOCK_USER.name}! Aqui está o resumo do seu pipeline.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Leads"
          value={String(MOCK_LEADS.length)}
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
        <PipelineFunnel deals={MOCK_DEALS} />
        <DealsByMonth deals={MOCK_DEALS} />
      </div>

      <UpcomingDeals deals={upcomingDeals} leads={MOCK_LEADS} />
    </div>
  )
}
