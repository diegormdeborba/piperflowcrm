"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const LABELS: Record<string, string> = {
  app: "App",
  dashboard: "Dashboard",
  leads: "Leads",
  pipeline: "Pipeline",
  activities: "Atividades",
  settings: "Configurações",
  onboarding: "Onboarding",
}

export function Breadcrumbs() {
  const pathname = usePathname()

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "app")

  if (segments.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1
        const href = "/app/" + segments.slice(0, index + 1).join("/")
        const label = LABELS[segment] ?? segment

        return (
          <span key={segment} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            {isLast ? (
              <span className={cn("font-medium text-foreground")}>{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
