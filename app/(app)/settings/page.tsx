import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Configurações — PipeFlow CRM",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Gerencie seu workspace, membros e plano de assinatura."
      />
      <div className="flex gap-6">
        <div className="w-48 shrink-0 space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 rounded-lg" />
          ))}
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48 rounded" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
