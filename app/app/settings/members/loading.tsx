import { Skeleton } from "@/components/ui/skeleton"

export default function MembersLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* nav skeleton */}
        <div className="flex flex-row lg:flex-col gap-1 lg:w-44 shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-9 flex-1 lg:flex-none lg:w-full rounded-md" />
          ))}
        </div>
        {/* content skeleton */}
        <div className="flex-1 rounded-xl border bg-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-9 w-24 shrink-0" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>
                <Skeleton className="h-7 w-24 shrink-0" />
                <Skeleton className="h-7 w-7 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
