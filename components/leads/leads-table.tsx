"use client"

import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EmptyState } from "@/components/ui/empty-state"
import { LeadStatusBadge } from "@/components/leads/lead-status-badge"
import { Users } from "lucide-react"
import type { Lead } from "@/types"
import { MOCK_USER } from "@/lib/mock-data"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

interface LeadsTableProps {
  leads: Lead[]
  onEdit: (lead: Lead) => void
  onDelete: (lead: Lead) => void
}

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  const router = useRouter()

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Nenhum lead encontrado"
        description="Tente ajustar os filtros ou adicione um novo lead para começar."
      />
    )
  }

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="hidden md:table-cell">Empresa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Responsável</TableHead>
            <TableHead className="hidden lg:table-cell">Criado em</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer"
              onClick={() => router.push(`/app/leads/${lead.id}`)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {lead.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{lead.name}</p>
                    {lead.email && (
                      <p className="text-xs text-muted-foreground truncate hidden sm:block">{lead.email}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                {lead.company ?? "—"}
              </TableCell>
              <TableCell>
                <LeadStatusBadge status={lead.status} />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                      {MOCK_USER.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{MOCK_USER.name.split(" ")[0]}</span>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {formatDate(lead.created_at)}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Ações</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/app/leads/${lead.id}`)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(lead)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete(lead)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
