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
  owners: { id: string; name: string }[]
}

export function DealFilters({ ownerFilter, onOwnerFilterChange, owners }: DealFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Select value={ownerFilter} onValueChange={onOwnerFilterChange}>
        <SelectTrigger className="w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os responsáveis</SelectItem>
          {owners.map((o) => (
            <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
