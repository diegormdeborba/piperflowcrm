"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Users, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/app/settings/workspace", label: "Workspace", icon: Building2 },
  { href: "/app/settings/members", label: "Membros", icon: Users },
  { href: "/app/settings/billing", label: "Plano & Faturamento", icon: CreditCard },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-row lg:flex-col gap-1 lg:w-44 shrink-0">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === href
              ? "bg-secondary font-medium text-foreground"
              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
