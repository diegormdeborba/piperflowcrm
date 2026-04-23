import { Skeleton } from "@/components/ui/skeleton"

export default function ActivitiesLoading() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* filtros */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-md" />
        ))}
      </div>

      {/* timeline */}
      <div className="relative border-l border-border ml-4 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="ml-6 relative">
            <Skeleton className="absolute -left-9 h-6 w-6 rounded-full" />
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-3 w-24 shrink-0" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className={`h-4 w-${i % 2 === 0 ? "3/4" : "1/2"}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
