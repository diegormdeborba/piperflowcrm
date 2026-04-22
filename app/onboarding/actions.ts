"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 50)
}

export async function createWorkspace(name: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const baseSlug = slugify(name)
  const slug = baseSlug || `workspace-${Date.now()}`

  const { data: workspace, error: wsError } = await supabase
    .from("workspaces")
    .insert({ name, slug })
    .select("id")
    .single()

  if (wsError) {
    return { error: "Não foi possível criar o workspace. Tente novamente." }
  }

  const { error: memberError } = await supabase.from("workspace_members").insert({
    workspace_id: workspace.id,
    user_id: user.id,
    role: "admin",
  })

  if (memberError) {
    return { error: "Erro ao configurar permissões do workspace." }
  }

  redirect("/app/dashboard")
}

export async function joinWorkspaceByInvite(token: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: invite, error: inviteError } = await supabase
    .from("invites")
    .select("id, workspace_id, email, role, expires_at, accepted_at")
    .eq("token", token)
    .single()

  if (inviteError || !invite) {
    return { error: "Código de convite inválido ou expirado." }
  }

  if (invite.accepted_at) {
    return { error: "Este convite já foi utilizado." }
  }

  if (new Date(invite.expires_at) < new Date()) {
    return { error: "Este convite expirou. Solicite um novo." }
  }

  const { error: memberError } = await supabase.from("workspace_members").insert({
    workspace_id: invite.workspace_id,
    user_id: user.id,
    role: invite.role,
  })

  if (memberError) {
    return { error: "Erro ao entrar no workspace. Você já pode ser membro." }
  }

  await supabase
    .from("invites")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invite.id)

  redirect("/app/dashboard")
}
