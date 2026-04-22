import type { DealStage } from "@/types"

export const STAGE_CONFIG: Record<DealStage, { label: string; color: string; headerColor: string; accent: string }> = {
  new_lead:      { label: "Novo Lead",         color: "text-blue-500",   headerColor: "bg-blue-500/10",   accent: "#3B82F6" },
  contacted:     { label: "Contato Realizado", color: "text-yellow-500", headerColor: "bg-yellow-500/10", accent: "#F59E0B" },
  proposal_sent: { label: "Proposta Enviada",  color: "text-purple-500", headerColor: "bg-purple-500/10", accent: "#8B5CF6" },
  negotiation:   { label: "Negociação",        color: "text-orange-500", headerColor: "bg-orange-500/10", accent: "#F97316" },
  won:           { label: "Fechado Ganho",     color: "text-green-500",  headerColor: "bg-green-500/10",  accent: "#10B981" },
  lost:          { label: "Fechado Perdido",   color: "text-red-500",    headerColor: "bg-red-500/10",    accent: "#EF4444" },
}

export const STAGES: DealStage[] = [
  "new_lead",
  "contacted",
  "proposal_sent",
  "negotiation",
  "won",
  "lost",
]
