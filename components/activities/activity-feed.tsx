"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ActivityType } from "@/types"

type ActivityWithLead = {
  id: string
  type: ActivityType
  description: string
  created_at: string
  lead_id: string
  leads: { name: string } | null
}

const TYPE_CONFIG: Record<ActivityType, { label: string; icon: React.ElementType; color: string }> = {
  call:    { label: "Ligação",  icon: Phone,    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  email:   { label: "E-mail",   icon: Mail,     color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  meeting: { label: "Reunião",  icon: Calendar, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  note:    { label: "Nota",     icon: FileText, color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
}

const FILTERS: { value: ActivityType | "all"; label: string }[] = [
  { value: "all",     label: "Todas" },
  { value: "call",    label: "Ligações" },
  { value: "email",   label: "E-mails" },
  { value: "meeting", label: "Reuniões" },
  { value: "note",    label: "Notas" },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface ActivityFeedProps {
  activities: ActivityWithLead[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const [filter, setFilter] = useState<ActivityType | "all">("all")

  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.value}
            size="sm"
            variant={filter === f.value ? "default" : "outline"}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
          <FileText className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm">Nenhuma atividade encontrada.</p>
          <p className="text-xs mt-1">Registre atividades na página de detalhe de cada lead.</p>
        </div>
      ) : (
        <ol className="relative border-l border-border ml-4 space-y-0">
          {filtered.map((activity) => {
            const cfg = TYPE_CONFIG[activity.type]
            const Icon = cfg.icon
            return (
              <li key={activity.id} className="mb-6 ml-6">
                <span className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${cfg.color}`}>
                  <Icon className="h-3 w-3" />
                </span>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className={`text-xs ${cfg.color}`}>
                        {cfg.label}
                      </Badge>
                      {activity.leads && (
                        <Link
                          href={`/app/leads/${activity.lead_id}`}
                          className="text-sm font-medium hover:underline"
                        >
                          {activity.leads.name}
                        </Link>
                      )}
                    </div>
                    <time className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(activity.created_at)}
                    </time>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
