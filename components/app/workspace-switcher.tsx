"use client"

import { useState, useTransition } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/components/providers/user-provider"
import { switchWorkspace } from "@/app/app/settings/actions"
import { createWorkspace } from "@/app/onboarding/actions"

export function WorkspaceSwitcher() {
  const { workspace, allWorkspaces } = useUser()
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  if (!workspace) return null

  function handleSwitch(id: string) {
    if (id === workspace!.id) return
    setOpen(false)
    startTransition(async () => { await switchWorkspace(id) })
  }

  function handleCreate() {
    if (!newName.trim()) return
    setError("")
    startTransition(async () => {
      const result = await createWorkspace(newName.trim())
      if (result?.error) {
        setError(result.error)
      } else {
        setDialogOpen(false)
        setNewName("")
      }
    })
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-2 h-auto py-1.5 font-normal"
            disabled={isPending}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                {workspace.name.charAt(0)}
              </div>
              <span className="truncate text-sm font-medium">{workspace.name}</span>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Seus workspaces
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allWorkspaces.map((ws) => (
            <DropdownMenuItem
              key={ws.id}
              onSelect={() => handleSwitch(ws.id)}
              className="gap-2"
            >
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                {ws.name.charAt(0)}
              </div>
              <span className="truncate flex-1">{ws.name}</span>
              {ws.id === workspace.id && <Check className="h-3.5 w-3.5 shrink-0" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => { setOpen(false); setDialogOpen(true) }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Criar novo workspace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ws-name">Nome do workspace</Label>
              <Input
                id="ws-name"
                placeholder="Ex: Minha Empresa"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate} disabled={isPending || !newName.trim()}>
                {isPending ? "Criando..." : "Criar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
