"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { LeadDetailCard } from "@/components/leads/detail/lead-detail-card"
import { ActivityTimeline } from "@/components/leads/detail/activity-timeline"
import { AddActivityDialog } from "@/components/leads/detail/add-activity-dialog"
import { LeadSheet } from "@/components/leads/lead-sheet"
import { DeleteLeadDialog } from "@/components/leads/delete-lead-dialog"
import { updateLead, deleteLead, createActivity } from "@/app/app/leads/actions"
import type { Lead, Activity, ActivityType } from "@/types"
import type { LeadFormData } from "@/components/leads/lead-form"

interface LeadDetailClientProps {
  lead: Lead
  activities: Activity[]
}

export function LeadDetailClient({ lead, activities }: LeadDetailClientProps) {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [activityOpen, setActivityOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSave(data: LeadFormData) {
    const result = await updateLead(lead.id, data)
    if (result?.error) {
      toast.error(result.error)
      return
    }
    toast.success("Lead atualizado!")
    setEditOpen(false)
  }

  async function handleDelete(_: Lead) {
    startTransition(async () => {
      const result = await deleteLead(lead.id)
      if (result?.error) toast.error(result.error)
      else {
        toast.success("Lead excluído.")
        router.push("/app/leads")
      }
    })
  }

  async function handleAddActivity(type: ActivityType, description: string) {
    const result = await createActivity(lead.id, type, description)
    if (result?.error) {
      toast.error(result.error)
      return
    }
    toast.success("Atividade registrada!")
    setActivityOpen(false)
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
