import { redirect } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AcceptInviteButton } from "@/components/settings/accept-invite-button"

export const metadata: Metadata = {
  title: "Convite — PipeFlow CRM",
}

interface Props {
  params: Promise<{ token: string }>
}

export default async function InvitePage({ params }: Props) {
  const { token } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/invite/${token}`)
  }

  const { data: invite } = await supabase
    .from("invites")
    .select("id, workspace_id, email, role, expires_at, accepted_at, workspaces(name)")
    .eq("token", token)
    .single()

  if (!invite) {
    return <InviteError message="Convite inválido ou não encontrado." />
  }

  if (invite.accepted_at) {
    return <InviteError message="Este convite já foi utilizado." />
  }

  if (new Date(invite.expires_at) < new Date()) {
    return <InviteError message="Este convite expirou. Solicite um novo ao administrador do workspace." />
  }

  const workspaceName = invite.workspaces
    ? (Array.isArray(invite.workspaces) ? invite.workspaces[0]?.name : (invite.workspaces as { name: string }).name)
    : "workspace"

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-8 space-y-6 text-center">
        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto">
          {workspaceName.charAt(0)}
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Você foi convidado</h1>
          <p className="text-muted-foreground text-sm">
            Para colaborar no workspace <strong>{workspaceName}</strong> como{" "}
            <strong>{invite.role === "admin" ? "admin" : "membro"}</strong>.
          </p>
        </div>
        <AcceptInviteButton token={token} />
        <p className="text-xs text-muted-foreground">
          Logado como <strong>{user.email}</strong>.{" "}
          <Link href="/login" className="underline">
            Não é você?
          </Link>
        </p>
      </Card>
    </div>
  )
}

function InviteError({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-8 space-y-4 text-center">
        <h1 className="text-lg font-semibold">Convite inválido</h1>
        <p className="text-muted-foreground text-sm">{message}</p>
        <Button asChild variant="outline">
          <Link href="/app/dashboard">Ir para o dashboard</Link>
        </Button>
      </Card>
    </div>
  )
}
