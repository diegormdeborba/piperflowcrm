import { Skeleton } from "@/components/ui/skeleton"

export default function PipelineLoading() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex gap-3 shrink-0">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* board */}
      <div className="bg-slate-50 dark:bg-slate-900/20 rounded-2xl p-3 sm:p-4">
        <div className="flex gap-3 sm:gap-4 overflow-x-hidden pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-none w-72 flex flex-col gap-3">
              {/* coluna header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              {/* cards */}
              {Array.from({ length: i === 0 ? 3 : i === 1 ? 2 : i === 2 ? 1 : 0 }).map((_, j) => (
                <div key={j} className="rounded-lg border bg-card p-4 space-y-3">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-5 w-20" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
              {/* empty drop zone */}
              {i >= 3 && (
                <div className="rounded-lg border-2 border-dashed border-border/50 h-24" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
