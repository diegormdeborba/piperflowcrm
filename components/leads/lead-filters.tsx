"use client"

import { useCallback, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { LeadStatus } from "@/types"

interface LeadFiltersProps {
  currentSearch: string
  currentStatus: LeadStatus | "all"
}

export function LeadFilters({ currentSearch, currentStatus }: LeadFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const push = useCallback(
    (search: string, status: string) => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (status && status !== "all") params.set("status", status)
      params.set("page", "1")
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname]
  )

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou empresa..."
          defaultValue={currentSearch}
          onChange={(e) => push(e.target.value, currentStatus)}
          className="pl-9"
        />
      </div>

      <Select
        value={currentStatus}
        onValueChange={(v) => push(currentSearch, v)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="new">Novo</SelectItem>
          <SelectItem value="contacted">Contactado</SelectItem>
          <SelectItem value="qualified">Qualificado</SelectItem>
          <SelectItem value="lost">Perdido</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
