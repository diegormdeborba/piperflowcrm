"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  BarChart3,
  Kanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WorkspaceSwitcher } from "@/components/app/workspace-switcher"
import { UserMenu } from "@/components/app/user-menu"

const NAV_LINKS = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/app/leads", icon: Users },
  { label: "Pipeline", href: "/app/pipeline", icon: Kanban },
  { label: "Atividades", href: "/app/activities", icon: Activity },
  { label: "Configurações", href: "/app/settings", icon: Settings },
]

interface SidebarProps {
  onLinkClick?: () => void
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="px-4 py-4">
        <Link href="/app/dashboard" className="flex items-center gap-2 mb-4" onClick={onLinkClick}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold text-sidebar-foreground">PipeFlow</span>
        </Link>
        <WorkspaceSwitcher />
      </div>

      <Separator className="bg-sidebar-border" />

      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="space-y-0.5">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />

      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <UserMenu />
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 shrink-0">
          Free
        </Badge>
      </div>
    </div>
  )
}
