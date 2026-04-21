import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/types"

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  new:       { label: "Novo",        className: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  contacted: { label: "Contactado",  className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  qualified: { label: "Qualificado", className: "bg-green-500/10 text-green-600 dark:text-green-400" },
  lost:      { label: "Perdido",     className: "bg-red-500/10 text-red-600 dark:text-red-400" },
}

interface LeadStatusBadgeProps {
  status: LeadStatus
  className?: string
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const { label, className: colorClass } = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}

export { STATUS_CONFIG }
