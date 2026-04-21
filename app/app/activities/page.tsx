import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Atividades — PipeFlow CRM",
}

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Atividades"
        description="Histórico de ligações, e-mails, reuniões e notas."
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova atividade
          </Button>
        }
      />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
            <Skeleton className="h-3 w-20 rounded shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
