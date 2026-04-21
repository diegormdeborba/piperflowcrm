"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LeadsPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function LeadsPagination({ page, totalPages, onPageChange }: LeadsPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="icon"
          className="h-8 w-8 text-sm"
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
