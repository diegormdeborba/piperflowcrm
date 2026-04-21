"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MOCK_WORKSPACES, MOCK_CURRENT_WORKSPACE } from "@/lib/mock-data"

export function WorkspaceSwitcher() {
  const [current, setCurrent] = useState(MOCK_CURRENT_WORKSPACE)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          className="w-full justify-between px-2 h-auto py-1.5 font-normal"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
              {current.name.charAt(0)}
            </div>
            <span className="truncate text-sm font-medium">{current.name}</span>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
        {MOCK_WORKSPACES.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => setCurrent(ws)}
            className="gap-2"
          >
            <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
              {ws.name.charAt(0)}
            </div>
            <span className="flex-1 truncate">{ws.name}</span>
            <div className="flex items-center gap-1.5">
              <Badge
                variant={ws.plan === "pro" ? "default" : "secondary"}
                className="text-[10px] px-1 py-0 h-4"
              >
                {ws.plan === "pro" ? "Pro" : "Free"}
              </Badge>
              <Check
                className={cn(
                  "h-3.5 w-3.5 text-primary",
                  current.id === ws.id ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-muted-foreground">
          <Plus className="h-4 w-4" />
          Novo workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
