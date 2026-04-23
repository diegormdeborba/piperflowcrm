import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { ActivityFeed } from "@/components/activities/activity-feed"
import { getActiveWorkspace } from "@/lib/workspace"

export const metadata: Metadata = {
  title: "Atividades — PipeFlow CRM",
}

export default async function ActivitiesPage() {
  const { workspace, supabase } = await getActiveWorkspace()

  const { data: activities } = await supabase
    .from("activities")
    .select("id, type, description, created_at, lead_id, leads(name)")
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false })
    .limit(200)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Atividades"
        description="Histórico de ligações, e-mails, reuniões e notas."
      />
      <ActivityFeed activities={(activities ?? []) as unknown as Parameters<typeof ActivityFeed>[0]["activities"]} />
    </div>
  )
}
