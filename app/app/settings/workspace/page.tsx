import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { SettingsNav } from "@/components/settings/settings-nav"
import { WorkspaceForm } from "@/components/settings/workspace-form"

export const metadata: Metadata = {
  title: "Workspace — PipeFlow CRM",
}

export default async function WorkspaceSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: memberData } = await supabase
    .from("workspace_members")
    .select("role, workspaces(id, name, plan)")
    .eq("user_id", user.id)
    .limit(1)
    .single()

  const ws = memberData?.workspaces
    ? (Array.isArray(memberData.workspaces) ? memberData.workspaces[0] : memberData.workspaces)
    : null

  if (!ws) redirect("/onboarding")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Gerencie seu workspace, membros e plano."
      />
      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsNav />
        <div className="flex-1 space-y-4">
          <Card className="p-6">
            <h2 className="text-base font-semibold mb-4">Informações do workspace</h2>
            <WorkspaceForm
              workspaceId={ws.id}
              currentName={ws.name}
              plan={ws.plan}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
