"use client"

import { useTransition } from "react"
import { Loader2, Zap, CheckCircle2, Users, UserCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createCheckoutSession, createPortalSession } from "@/app/app/settings/billing/actions"

interface BillingSectionProps {
  plan: "free" | "pro"
  leadsCount: number
  membersCount: number
}

const FREE_LIMITS = { leads: 50, members: 2 }

export function BillingSection({ plan, leadsCount, membersCount }: BillingSectionProps) {
  const [isPending, startTransition] = useTransition()

  function handleUpgrade() {
    startTransition(async () => {
      const result = await createCheckoutSession()
      if (result?.error) toast.error(result.error)
    })
  }

  function handlePortal() {
    startTransition(async () => {
      const result = await createPortalSession()
      if (result?.error) toast.error(result.error)
    })
  }

  const isPro = plan === "pro"

  return (
    <div className="space-y-6">
      {/* Plano atual */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Plano {isPro ? "Pro" : "Free"}</h3>
            <Badge variant={isPro ? "default" : "secondary"}>
              {isPro ? "Ativo" : "Gratuito"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isPro ? "Acesso ilimitado a todos os recursos." : "Até 50 leads e 2 membros."}
          </p>
        </div>
        {isPro ? (
          <Button variant="outline" onClick={handlePortal} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Gerenciar assinatura
          </Button>
        ) : (
          <Button onClick={handleUpgrade} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            Assinar Pro — R$ 49/mês
          </Button>
        )}
      </div>

      {/* Uso atual */}
      {!isPro && (
        <div className="grid grid-cols-2 gap-4">
          <UsageCard
            icon={UserCheck}
            label="Leads"
            current={leadsCount}
            max={FREE_LIMITS.leads}
          />
          <UsageCard
            icon={Users}
            label="Membros"
            current={membersCount}
            max={FREE_LIMITS.members}
          />
        </div>
      )}

      {/* Features */}
      <div className="rounded-lg border p-5 space-y-3">
        <p className="text-sm font-medium">
          {isPro ? "Seu plano inclui:" : "Com o plano Pro você terá:"}
        </p>
        <ul className="space-y-2">
          {[
            "Leads ilimitados",
            "Membros ilimitados no workspace",
            "Pipeline Kanban com histórico completo",
            "Dashboard de métricas em tempo real",
            "Registro de atividades (ligações, e-mails, reuniões)",
            "Suporte prioritário",
          ].map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function UsageCard({
  icon: Icon,
  label,
  current,
  max,
}: {
  icon: React.ElementType
  label: string
  current: number
  max: number
}) {
  const pct = Math.min((current / max) * 100, 100)
  const isNearLimit = pct >= 80

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </div>
      <p className={`text-2xl font-bold ${isNearLimit ? "text-amber-600" : ""}`}>
        {current}
        <span className="text-sm font-normal text-muted-foreground">/{max}</span>
      </p>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isNearLimit ? "bg-amber-500" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
