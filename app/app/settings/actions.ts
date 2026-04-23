"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendInviteEmail } from "@/lib/resend"
import { rateLimit } from "@/lib/rate-limit"
import { canAddMember } from "@/lib/limits"

const ACTIVE_WORKSPACE_COOKIE = "piperflow_active_workspace"

async function getSessionUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  return user
}

async function assertAdmin(workspaceId: string) {
  const supabase = await createClient()
  const user = await getSessionUser()
  const { data } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .single()
  if (data?.role !== "admin") return { error: "Permissão negada." }
  return { user, supabase }
}

export async function switchWorkspace(workspaceId: string) {
  const user = await getSessionUser()
  const supabase = await createClient()

  const { data } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .single()

  if (!data) return { error: "Workspace não encontrado." }

  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_WORKSPACE_COOKIE, workspaceId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  })

  redirect("/app/dashboard")
}

export async function updateWorkspaceName(workspaceId: string, name: string): Promise<{ error?: string }> {
  const result = await assertAdmin(workspaceId)
  if ("error" in result) return result

  const { supabase } = result
  const trimmed = name.trim()
  if (!trimmed || trimmed.length < 2) return { error: "Nome deve ter ao menos 2 caracteres." }

  const { error } = await supabase
    .from("workspaces")
    .update({ name: trimmed })
    .eq("id", workspaceId)

  if (error) return { error: "Erro ao atualizar workspace." }

  revalidatePath("/app/settings/workspace")
  return {}
}

export async function inviteMember(workspaceId: string, email: string, role: "admin" | "member"): Promise<{ error?: string }> {
  const result = await assertAdmin(workspaceId)
  if ("error" in result) return result

  // 5 convites por usuário por hora
  if (!rateLimit(`invite:${result.user.id}`, 5, 60 * 60 * 1000)) {
    return { error: "Muitas tentativas. Tente novamente em 1 hora." }
  }

  const { supabase } = result

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("name, plan")
    .eq("id", workspaceId)
    .single()

  if (!workspace) return { error: "Workspace não encontrado." }

  const limit = await canAddMember(workspaceId, workspace.plan, supabase)
  if (!limit.allowed) return { error: limit.error }

  const { data: existing } = await supabase
    .from("invites")
    .select("id")
    .eq("workspace_id", workspaceId)
    .eq("email", email.toLowerCase())
    .is("accepted_at", null)
    .gt("expires_at", new Date().toISOString())
    .single()

  if (existing) return { error: "Já existe um convite pendente para este e-mail." }

  const admin = createAdminClient()
  const { data: invite, error: inviteError } = await admin
    .from("invites")
    .insert({
      workspace_id: workspaceId,
      email: email.toLowerCase(),
      role,
    })
    .select("id, token")
    .single()

  if (inviteError || !invite) return { error: "Erro ao criar convite." }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const inviteUrl = `${appUrl}/invite/${invite.token}`

  const emailResult = await sendInviteEmail({ to: email, workspaceName: workspace.name, inviteUrl })
  if (emailResult.error) {
    // Convite criado mas email falhou — remove o convite e retorna erro legível
    await admin.from("invites").delete().eq("id", invite.id)
    return { error: `Convite criado, mas o e-mail não pôde ser enviado: ${emailResult.error}` }
  }

  revalidatePath("/app/settings/members")
  return {}
}

export async function removeMember(workspaceId: string, userId: string): Promise<{ error?: string }> {
  const result = await assertAdmin(workspaceId)
  if ("error" in result) return result

  const { supabase } = result

  const { count } = await supabase
    .from("workspace_members")
    .select("*", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)
    .eq("role", "admin")

  const { data: target } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)
    .single()

  if (target?.role === "admin" && (count ?? 0) <= 1) {
    return { error: "Não é possível remover o último admin do workspace." }
  }

  const { error } = await supabase
    .from("workspace_members")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)

  if (error) return { error: "Erro ao remover membro." }

  revalidatePath("/app/settings/members")
  return {}
}

export async function changeMemberRole(
  workspaceId: string,
  userId: string,
  role: "admin" | "member"
): Promise<{ error?: string }> {
  const result = await assertAdmin(workspaceId)
  if ("error" in result) return result

  const { supabase } = result

  if (role === "member") {
    const { count } = await supabase
      .from("workspace_members")
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .eq("role", "admin")

    if ((count ?? 0) <= 1) {
      return { error: "Não é possível remover o último admin do workspace." }
    }
  }

  const { error } = await supabase
    .from("workspace_members")
    .update({ role })
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)

  if (error) return { error: "Erro ao alterar papel." }

  revalidatePath("/app/settings/members")
  return {}
}

export async function revokeInvite(workspaceId: string, inviteId: string): Promise<{ error?: string }> {
  const result = await assertAdmin(workspaceId)
  if ("error" in result) return result

  const { supabase } = result

  const { error } = await supabase
    .from("invites")
    .delete()
    .eq("id", inviteId)
    .eq("workspace_id", workspaceId)

  if (error) return { error: "Erro ao revogar convite." }

  revalidatePath("/app/settings/members")
  return {}
}
