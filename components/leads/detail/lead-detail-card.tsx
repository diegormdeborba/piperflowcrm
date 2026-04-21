"use client"

import { Building2, Mail, MoreHorizontal, Phone, Pencil, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LeadStatusBadge } from "@/components/leads/lead-status-badge"
import type { Lead } from "@/types"

interface LeadDetailCardProps {
  lead: Lead
  onEdit: () => void
  onDelete: () => void
}

export function LeadDetailCard({ lead, onEdit, onDelete }: LeadDetailCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
              {lead.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-bold">{lead.name}</h2>
            {(lead.role || lead.company) && (
              <p className="text-sm text-muted-foreground">
                {[lead.role, lead.company].filter(Boolean).join(" na ")}
              </p>
            )}
            <LeadStatusBadge status={lead.status} />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir lead
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {(lead.email || lead.phone) && (
        <div className="mt-5 flex flex-wrap gap-4 pt-5 border-t">
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              {lead.email}
            </a>
          )}
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              {lead.phone}
            </a>
          )}
          {lead.company && (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              {lead.company}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
