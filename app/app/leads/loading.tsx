import { Skeleton } from "@/components/ui/skeleton"

export default function LeadsLoading() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-52" />
        </div>
        <Skeleton className="h-9 w-28 shrink-0" />
      </div>

      {/* filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-9 flex-1 max-w-sm" />
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-9 w-44" />
      </div>

      {/* tabela */}
      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted/40 px-4 py-3 flex gap-4">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24 hidden md:block ml-auto" />
          <Skeleton className="h-4 w-20 hidden lg:block" />
          <Skeleton className="h-4 w-20 hidden lg:block" />
          <Skeleton className="h-4 w-8" />
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-4 border-t">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5 min-w-0">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-44 hidden sm:block" />
            </div>
            <Skeleton className="h-5 w-24 hidden md:block rounded-full" />
            <Skeleton className="h-4 w-20 hidden lg:block" />
            <Skeleton className="h-4 w-20 hidden lg:block" />
            <Skeleton className="h-7 w-7 ml-auto" />
          </div>
        ))}
      </div>

      {/* paginação */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  )
}
