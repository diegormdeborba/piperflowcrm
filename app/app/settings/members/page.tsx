import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { PageHeader } from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { SettingsNav } from "@/components/settings/settings-nav"
import { MembersManager } from "@/components/settings/members-manager"

export const metadata: Metadata = {
  title: "Membros — PipeFlow CRM",
}

const ACTIVE_WORKSPACE_COOKIE = "piperflow_active_workspace"

export default async function MembersSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const cookieStore = await cookies()
  const activeId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value

  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("role, workspaces(id, name, plan)")
    .eq("user_id", user.id)

  if (!memberships || memberships.length === 0) redirect("/onboarding")

  const activeMembership =
    (activeId && memberships.find((m) => {
      const ws = Array.isArray(m.workspaces) ? m.workspaces[0] : m.workspaces
      return ws?.id === activeId
    })) || memberships[0]

  const ws = Array.isArray(activeMembership.workspaces)
    ? activeMembership.workspaces[0]
    : activeMembership.workspaces

  if (!ws) redirect("/onboarding")

  const isAdmin = activeMembership.role === "admin"

  const { data: rawMembers } = await supabase
    .from("workspace_members")
    .select("user_id, role")
    .eq("workspace_id", ws.id)

  const admin = createAdminClient()
  const members = await Promise.all(
    (rawMembers ?? []).map(async (m) => {
      const { data: userData } = await admin.auth.admin.getUserById(m.user_id)
      const u = userData?.user
      const fullName =
        (u?.user_metadata?.full_name as string | undefined) ?? u?.email ?? "Usuário"
      return {
        user_id: m.user_id,
        role: m.role,
        email: u?.email ?? "",
        name: fullName,
      }
    })
  )

  const { data: pendingInvites } = await supabase
    .from("invites")
    .select("id, email, role, expires_at")
    .eq("workspace_id", ws.id)
    .is("accepted_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("expires_at", { ascending: true })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Gerencie seu workspace, membros e plano."
      />
      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsNav />
        <div className="flex-1">
          <Card className="p-6">
            <MembersManager
              workspaceId={ws.id}
              plan={ws.plan}
              members={members}
              pendingInvites={pendingInvites ?? []}
              currentUserId={user.id}
              isAdmin={isAdmin}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
