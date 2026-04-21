"use client"

import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { DealCard } from "@/components/pipeline/deal-card"
import { STAGE_CONFIG } from "@/components/pipeline/stage-config"
import type { Deal, DealStage, Lead } from "@/types"

interface DealColumnProps {
  stage: DealStage
  deals: Deal[]
  leads: Lead[]
  ownerFallback: string
  onCardClick: (deal: Deal) => void
}

function formatCurrency(value: number) {
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

export function DealColumn({ stage, deals, leads, ownerFallback, onCardClick }: DealColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const { label, color, headerColor } = STAGE_CONFIG[stage]
  const total = deals.reduce((sum, d) => sum + (d.value ?? 0), 0)

  return (
    <div className="flex-none w-64 flex flex-col gap-2">
      <div className={cn("rounded-lg px-3 py-2 flex items-center justify-between", headerColor)}>
        <div>
          <p className={cn("text-xs font-semibold", color)}>{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {deals.length} {deals.length === 1 ? "negócio" : "negócios"}
            {total > 0 && ` · ${formatCurrency(total)}`}
          </p>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 min-h-[120px] rounded-lg p-1 transition-colors",
          isOver && "bg-muted/50 ring-2 ring-primary/20",
        )}
      >
        {deals.length === 0 ? (
          <div className="flex items-center justify-center h-24 rounded-lg border border-dashed">
            <p className="text-xs text-muted-foreground">Sem negócios</p>
          </div>
        ) : (
          deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              lead={leads.find((l) => l.id === deal.lead_id) ?? null}
              ownerFallback={ownerFallback}
              onClick={() => onCardClick(deal)}
            />
          ))
        )}
      </div>
    </div>
  )
}
