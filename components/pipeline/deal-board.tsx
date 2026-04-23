"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { DealColumn } from "@/components/pipeline/deal-column"
import { DealCard } from "@/components/pipeline/deal-card"
import { STAGES } from "@/components/pipeline/stage-config"
import type { Deal, DealStage, Lead } from "@/types"

interface DealBoardProps {
  deals: Deal[]
  leads: Lead[]
  ownerFallback: string
  onMove: (dealId: string, newStage: DealStage) => void
  onCardClick: (deal: Deal) => void
  onAddDeal: (stage: DealStage) => void
}

export function DealBoard({ deals, leads, ownerFallback, onMove, onCardClick, onAddDeal }: DealBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over) return
    const newStage = over.id as DealStage
    const deal = deals.find((d) => d.id === active.id)
    if (deal && deal.stage !== newStage) {
      onMove(deal.id, newStage)
    }
  }

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) ?? null : null

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="bg-slate-50 dark:bg-slate-900/20 rounded-2xl p-3 sm:p-4 -mx-1">
        {/* wrapper relativo para o fade de scroll */}
        <div className="relative">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scroll-smooth">
            {STAGES.map((stage) => (
              <DealColumn
                key={stage}
                stage={stage}
                deals={deals.filter((d) => d.stage === stage)}
                leads={leads}
                ownerFallback={ownerFallback}
                onCardClick={onCardClick}
                onAddDeal={() => onAddDeal(stage)}
              />
            ))}
          </div>
          {/* fade direito — visível só em mobile/tablet para indicar scroll */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent lg:hidden" />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-1 lg:hidden">
          Deslize para ver todas as etapas
        </p>
      </div>

      <DragOverlay>
        {activeDeal && (
          <DealCard
            deal={activeDeal}
            lead={leads.find((l) => l.id === activeDeal.lead_id) ?? null}
            ownerFallback={ownerFallback}
            onClick={() => {}}
            isDragOverlay
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
