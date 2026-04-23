import { Skeleton } from "@/components/ui/skeleton"

export default function BillingLoading() {
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
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-9 w-36 shrink-0" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-4 space-y-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border p-5 space-y-3">
            <Skeleton className="h-4 w-32" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
