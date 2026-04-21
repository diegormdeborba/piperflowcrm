import { Phone, Mail, CalendarDays, FileText } from "lucide-react"
import type { Activity, ActivityType } from "@/types"

const ACTIVITY_CONFIG: Record<ActivityType, { label: string; icon: React.ElementType; color: string }> = {
  call:    { label: "Ligação",  icon: Phone,        color: "bg-blue-500/10 text-blue-500" },
  email:   { label: "E-mail",   icon: Mail,         color: "bg-purple-500/10 text-purple-500" },
  meeting: { label: "Reunião",  icon: CalendarDays, color: "bg-green-500/10 text-green-500" },
  note:    { label: "Nota",     icon: FileText,     color: "bg-yellow-500/10 text-yellow-500" },
}

function formatRelativeDate(iso: string) {
  const date = new Date(iso)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return `hoje às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
  if (diffDays === 1) return "ontem"
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

interface ActivityTimelineProps {
  activities: Activity[]
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Nenhuma atividade registrada ainda.
      </p>
    )
  }

  const sorted = [...activities].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="space-y-4">
      {sorted.map((activity, index) => {
        const { label, icon: Icon, color } = ACTIVITY_CONFIG[activity.type]
        return (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              {index < sorted.length - 1 && (
                <div className="w-px flex-1 bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 pb-4 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatRelativeDate(activity.created_at)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
