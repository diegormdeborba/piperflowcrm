"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { UserPlus, Trash2, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { inviteMember, removeMember, changeMemberRole, revokeInvite } from "@/app/app/settings/actions"

interface Member {
  user_id: string
  role: string
  email: string
  name: string
}

interface PendingInvite {
  id: string
  email: string
  role: string
  expires_at: string
}

interface MembersManagerProps {
  workspaceId: string
  plan: string
  members: Member[]
  pendingInvites: PendingInvite[]
  currentUserId: string
  isAdmin: boolean
}

export function MembersManager({
  workspaceId,
  plan,
  members,
  pendingInvites,
  currentUserId,
  isAdmin,
}: MembersManagerProps) {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member")
  const [inviteError, setInviteError] = useState("")
  const [isPending, startTransition] = useTransition()

  const atFreeLimit = plan === "free" && members.length >= 2

  function handleInvite() {
    if (!inviteEmail.trim()) return
    setInviteError("")
    startTransition(async () => {
      const result = await inviteMember(workspaceId, inviteEmail.trim(), inviteRole)
      if (result?.error) {
        setInviteError(result.error)
      } else {
        toast.success("Convite enviado com sucesso.")
        setInviteOpen(false)
        setInviteEmail("")
        setInviteRole("member")
      }
    })
  }

  function handleRemove(userId: string, name: string) {
    if (!confirm(`Remover ${name} do workspace?`)) return
    startTransition(async () => {
      const result = await removeMember(workspaceId, userId)
      if (result?.error) toast.error(result.error)
      else toast.success("Membro removido.")
    })
  }

  function handleRoleChange(userId: string, role: "admin" | "member") {
    startTransition(async () => {
      const result = await changeMemberRole(workspaceId, userId, role)
      if (result?.error) toast.error(result.error)
      else toast.success("Papel atualizado.")
    })
  }

  function handleRevokeInvite(inviteId: string) {
    startTransition(async () => {
      const result = await revokeInvite(workspaceId, inviteId)
      if (result?.error) toast.error(result.error)
      else toast.success("Convite revogado.")
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Membros ({members.length})</h3>
          <p className="text-sm text-muted-foreground">
            {plan === "free" ? `${members.length}/2 no plano Free` : "Plano Pro — ilimitado"}
          </p>
        </div>
        {isAdmin && (
          <Button
            size="sm"
            onClick={() => setInviteOpen(true)}
            disabled={atFreeLimit}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Convidar
          </Button>
        )}
      </div>

      {atFreeLimit && isAdmin && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-3 text-sm text-amber-700 dark:text-amber-400">
          Limite de 2 membros atingido no plano Free.{" "}
          <a href="/app/settings/billing" className="underline font-medium">
            Faça upgrade para Pro
          </a>{" "}
          para adicionar mais membros.
        </div>
      )}

      <div className="space-y-2">
        {members.map((member) => {
          const initials = member.name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase()

          return (
            <div
              key={member.user_id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
              {isAdmin && member.user_id !== currentUserId ? (
                <Select
                  value={member.role}
                  onValueChange={(v) => handleRoleChange(member.user_id, v as "admin" | "member")}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-28 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <span className="flex items-center gap-1.5">
                        <Shield className="h-3 w-3" /> Admin
                      </span>
                    </SelectItem>
                    <SelectItem value="member">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3 w-3" /> Membro
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={member.role === "admin" ? "default" : "secondary"} className="text-xs">
                  {member.role === "admin" ? "Admin" : "Membro"}
                </Badge>
              )}
              {isAdmin && member.user_id !== currentUserId && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemove(member.user_id, member.name)}
                  disabled={isPending}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )
        })}
      </div>

      {pendingInvites.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Convites pendentes</h3>
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{invite.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {invite.role === "admin" ? "Admin" : "Membro"} · expira{" "}
                    {new Date(invite.expires_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">Pendente</Badge>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRevokeInvite(invite.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Convidar membro</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">E-mail</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="nome@empresa.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              />
            </div>
            <div className="space-y-2">
              <Label>Papel</Label>
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as "admin" | "member")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Membro — acesso a leads e pipeline</SelectItem>
                  <SelectItem value="admin">Admin — acesso total</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {inviteError && <p className="text-sm text-destructive">{inviteError}</p>}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleInvite} disabled={isPending || !inviteEmail.trim()}>
                {isPending ? "Enviando..." : "Enviar convite"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
