"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { LeadDetailCard } from "@/components/leads/detail/lead-detail-card"
import { ActivityTimeline } from "@/components/leads/detail/activity-timeline"
import { AddActivityDialog } from "@/components/leads/detail/add-activity-dialog"
import { LeadSheet } from "@/components/leads/lead-sheet"
import { DeleteLeadDialog } from "@/components/leads/delete-lead-dialog"
import { MOCK_LEADS, MOCK_ACTIVITIES } from "@/lib/mock-data"
import type { Lead, Activity, ActivityType } from "@/types"
import type { LeadFormData } from "@/components/leads/lead-form"

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [lead, setLead] = useState<Lead | null>(() => MOCK_LEADS.find((l) => l.id === id) ?? null)
  const [activities, setActivities] = useState<Activity[]>(() =>
    MOCK_ACTIVITIES.filter((a) => a.lead_id === id)
  )
  const [editOpen, setEditOpen] = useState(false)
  const [activityOpen, setActivityOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null)

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-muted-foreground mb-4">Lead não encontrado.</p>
        <Button variant="outline" onClick={() => router.push("/app/leads")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para leads
        </Button>
      </div>
    )
  }

  async function handleSave(data: LeadFormData) {
    await new Promise((r) => setTimeout(r, 600))
    setLead((prev) => (prev ? { ...prev, ...data } : null))
    toast.success("Lead atualizado!")
  }

  async function handleDelete(_target: Lead) {
    await new Promise((r) => setTimeout(r, 500))
    toast.success("Lead excluído.")
    router.push("/app/leads")
  }

  async function handleAddActivity(type: ActivityType, description: string) {
    if (!lead) return
    await new Promise((r) => setTimeout(r, 500))
    const newActivity: Activity = {
      id: `a${Date.now()}`,
      workspace_id: "w1",
      lead_id: lead.id,
      type,
      description,
      author_id: "u1",
      created_at: new Date().toISOString(),
    }
    setActivities((prev) => [newActivity, ...prev])
    toast.success("Atividade registrada!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/app/leads")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Leads
        </Button>
      </div>

      <LeadDetailCard
        lead={lead}
        onEdit={() => setEditOpen(true)}
        onDelete={() => setDeleteTarget(lead)}
      />

      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Atividades</h3>
          <Button size="sm" variant="outline" onClick={() => setActivityOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
        <ActivityTimeline activities={activities} />
      </div>

      <LeadSheet
        open={editOpen}
        lead={lead}
        onOpenChange={setEditOpen}
        onSave={handleSave}
      />

      <AddActivityDialog
        open={activityOpen}
        onOpenChange={setActivityOpen}
        onAdd={handleAddActivity}
      />

      <DeleteLeadDialog
        lead={deleteTarget}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  )
}
