"use client"

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
  search: string
  status: LeadStatus | "all"
  onSearchChange: (value: string) => void
  onStatusChange: (value: LeadStatus | "all") => void
}

export function LeadFilters({ search, status, onSearchChange, onStatusChange }: LeadFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou empresa..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={status} onValueChange={(v) => onStatusChange(v as LeadStatus | "all")}>
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
