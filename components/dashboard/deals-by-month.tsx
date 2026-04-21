"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Deal } from "@/types"

const PT_MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

interface DealsByMonthProps {
  deals: Deal[]
}

export function DealsByMonth({ deals }: DealsByMonthProps) {
  const now = new Date("2026-04-21")

  const data = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now)
    d.setMonth(d.getMonth() - (5 - i))
    const year = d.getFullYear()
    const month = d.getMonth()
    const count = deals.filter((deal) => {
      const created = new Date(deal.created_at)
      return created.getFullYear() === year && created.getMonth() === month
    }).length
    return { label: PT_MONTHS[month], count }
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Negócios por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [value, "Negócios"]} />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
