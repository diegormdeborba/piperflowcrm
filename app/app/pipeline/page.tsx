import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Pipeline — PipeFlow CRM",
}

const COLUMNS = [
  "Novo Lead",
  "Contato Realizado",
  "Proposta Enviada",
  "Negociação",
  "Fechado Ganho",
  "Fechado Perdido",
]

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        description="Acompanhe seus negócios em cada etapa do funil."
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo negócio
          </Button>
        }
      />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div key={col} className="flex-none w-64 space-y-2">
            <div className="flex items-center justify-between px-1">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-5 w-8 rounded" />
            </div>
            {Array.from({ length: Math.ceil(Math.random() * 3) + 1 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
