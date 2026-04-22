"use client"

import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"
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
  onAddDeal: () => void
}

function formatTotal(value: number) {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

export function DealColumn({ stage, deals, leads, ownerFallback, onCardClick, onAddDeal }: DealColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const { label, color, accent } = STAGE_CONFIG[stage]
  const total = deals.reduce((sum, d) => sum + (d.value ?? 0), 0)

  return (
    <div className="flex-none w-72 flex flex-col">
      {/* Column panel */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 flex flex-col overflow-hidden">

        {/* Colored top accent bar */}
        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: accent }} />

        {/* Header */}
        <div className="px-4 pt-3 pb-3 border-b border-border/40">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <p className="text-sm font-bold text-foreground truncate">{label}</p>
            </div>
            <button
              onClick={onAddDeal}
              className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
              aria-label={`Adicionar negócio em ${label}`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 pl-4">
            <span className={cn("font-medium", color)}>{deals.length}</span>
            {" "}
            {deals.length === 1 ? "negócio" : "negócios"}
            {total > 0 && (
              <span className="text-muted-foreground/70"> · {formatTotal(total)}</span>
            )}
          </p>
        </div>

        {/* Drop zone */}
        <div
          ref={setNodeRef}
          className={cn(
            "flex flex-col gap-2 p-3 min-h-[380px] transition-colors duration-100",
            isOver && "bg-primary/5 ring-2 ring-primary/20 ring-inset",
          )}
        >
          {deals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 rounded-xl border border-dashed border-border/60 gap-1.5 mt-1">
              <p className="text-xs text-muted-foreground/60">Solte aqui ou</p>
              <button
                onClick={onAddDeal}
                className="text-xs text-primary hover:underline font-medium"
              >
                adicionar negócio
              </button>
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
    </div>
  )
}
