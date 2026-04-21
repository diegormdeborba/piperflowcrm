"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DealFiltersProps {
  ownerFilter: string
  onOwnerFilterChange: (value: string) => void
}

const OWNERS = [
  { id: "all", label: "Todos os responsáveis" },
  { id: "u1",  label: "João Silva" },
]

export function DealFilters({ ownerFilter, onOwnerFilterChange }: DealFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Select value={ownerFilter} onValueChange={onOwnerFilterChange}>
        <SelectTrigger className="w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OWNERS.map((o) => (
            <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
