"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateWorkspaceName } from "@/app/app/settings/actions"

interface WorkspaceFormProps {
  workspaceId: string
  currentName: string
  plan: string
}

export function WorkspaceForm({ workspaceId, currentName, plan }: WorkspaceFormProps) {
  const [name, setName] = useState(currentName)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const result = await updateWorkspaceName(workspaceId, name)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Nome atualizado com sucesso.")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="workspace-name">Nome do workspace</Label>
        <Input
          id="workspace-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do workspace"
          minLength={2}
          required
        />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-sm">Plano atual</Label>
        <p className="text-sm font-medium capitalize">{plan === "pro" ? "Pro" : "Free"}</p>
      </div>
      <Button
        type="submit"
        disabled={isPending || name.trim() === currentName}
      >
        {isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  )
}
