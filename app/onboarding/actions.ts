"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"

const ACTIVE_WORKSPACE_COOKIE = "piperflow_active_workspace"

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

  // Server Action usa service role para evitar dependência circular no RLS:
  // workspace_members INSERT precisa de admin, mas o admin só existe após o INSERT.
  const admin = createAdminClient()

  const { data: workspace, error: wsError } = await admin
    .from("workspaces")
    .insert({ name, slug })
    .select("id")
    .single()

  if (wsError) {
    return { error: "Não foi possível criar o workspace. Tente novamente." }
  }

  const { error: memberError } = await admin.from("workspace_members").insert({
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

  // Garante que o usuário logado é o destinatário do convite
  if (user.email?.toLowerCase() !== invite.email.toLowerCase()) {
    return {
      error: `Este convite foi enviado para ${invite.email}. Faça login com essa conta para aceitar.`,
    }
  }

  // Usa admin client para bypassar RLS — o convidado ainda não é membro
  // e a policy insert_workspace_members exige is_workspace_admin()
  const admin = createAdminClient()

  const { error: memberError } = await admin.from("workspace_members").insert({
    workspace_id: invite.workspace_id,
    user_id: user.id,
    role: invite.role,
  })

  if (memberError) {
    return { error: "Erro ao entrar no workspace. Você já pode ser membro." }
  }

  // Admin client também necessário: policy admins_manage_invites exige is_workspace_admin para UPDATE
  await admin
    .from("invites")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invite.id)

  // Ativa o workspace do convite para o novo membro não cair no workspace errado
  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_WORKSPACE_COOKIE, invite.workspace_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  })

  redirect("/app/dashboard")
}
