"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const STAGE_COLORS: Record<string, string> = {
  new_lead:      "#3b82f6",
  contacted:     "#eab308",
  proposal_sent: "#a855f7",
  negotiation:   "#f97316",
}

const STAGE_LABELS: Record<string, string> = {
  new_lead:      "Novo Lead",
  contacted:     "Contato Realizado",
  proposal_sent: "Proposta Enviada",
  negotiation:   "Negociação",
}

interface PipelineFunnelProps {
  data: { stage: string; count: number }[]
}

export function PipelineFunnel({ data }: PipelineFunnelProps) {
  const chartData = data.map((d) => ({
    stage: d.stage,
    label: STAGE_LABELS[d.stage] ?? d.stage,
    count: d.count,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Pipeline por Etapa</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => [value, "Negócios"]} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.stage} fill={STAGE_COLORS[entry.stage] ?? "#94a3b8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
