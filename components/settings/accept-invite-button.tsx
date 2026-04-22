"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { joinWorkspaceByInvite } from "@/app/onboarding/actions"

export function AcceptInviteButton({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition()

  function handleAccept() {
    startTransition(async () => {
      const result = await joinWorkspaceByInvite(token)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <Button onClick={handleAccept} disabled={isPending} className="w-full">
      {isPending ? "Aceitando convite..." : "Aceitar convite"}
    </Button>
  )
}
