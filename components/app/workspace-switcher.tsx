"use client"

import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/components/providers/user-provider"

export function WorkspaceSwitcher() {
  const { workspace } = useUser()

  if (!workspace) return null

  return (
    <Button
      variant="ghost"
      role="combobox"
      className="w-full justify-between px-2 h-auto py-1.5 font-normal"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
          {workspace.name.charAt(0)}
        </div>
        <span className="truncate text-sm font-medium">{workspace.name}</span>
      </div>
      <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
    </Button>
  )
}
