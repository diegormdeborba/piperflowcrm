import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

const ACTIVE_WORKSPACE_COOKIE = "piperflow_active_workspace"

export async function getActiveWorkspace() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("role, workspaces(id, name, plan, stripe_customer_id)")
    .eq("user_id", user.id)

  if (!memberships || memberships.length === 0) redirect("/onboarding")

  const cookieStore = await cookies()
  const activeId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value

  const activeMembership =
    (activeId &&
      memberships.find((m) => {
        const ws = Array.isArray(m.workspaces) ? m.workspaces[0] : m.workspaces
        return ws?.id === activeId
      })) ||
    memberships[0]

  const ws = Array.isArray(activeMembership.workspaces)
    ? activeMembership.workspaces[0]
    : activeMembership.workspaces

  if (!ws) redirect("/onboarding")

  return {
    user,
    workspace: ws as { id: string; name: string; plan: "free" | "pro"; stripe_customer_id: string | null },
    role: activeMembership.role as "admin" | "member",
    supabase,
  }
}
