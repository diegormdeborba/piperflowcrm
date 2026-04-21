"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Building2, Users, ArrowRight, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

type Step = "choice" | "create" | "join"

const createSchema = z.object({
  workspaceName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
})

const joinSchema = z.object({
  inviteCode: z.string().min(6, "Código de convite inválido"),
})

type CreateData = z.infer<typeof createSchema>
type JoinData = z.infer<typeof joinSchema>

function ChoiceStep({ onSelect }: { onSelect: (step: Step) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Bem-vindo ao PipeFlow!</h1>
        <p className="text-slate-500 text-sm">
          Para começar, escolha como deseja usar o PipeFlow.
        </p>
      </div>

      <div className="grid gap-3">
        <button
          onClick={() => onSelect("create")}
          className={cn(
            "flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 text-left",
            "hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
          )}
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900">Criar minha empresa</p>
            <p className="text-sm text-slate-500">
              Configure um workspace para sua empresa ou projeto e convide seu time.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 ml-auto mt-1 shrink-0 group-hover:text-blue-500 transition-colors" />
        </button>

        <button
          onClick={() => onSelect("join")}
          className={cn(
            "flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 text-left",
            "hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
          )}
        >
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <Users className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900">Entrar com convite</p>
            <p className="text-sm text-slate-500">
              Tenho um código de convite e quero entrar no workspace do meu time.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 ml-auto mt-1 shrink-0 group-hover:text-blue-500 transition-colors" />
        </button>
      </div>
    </div>
  )
}

function CreateStep({ onBack }: { onBack: () => void }) {
  const router = useRouter()

  const form = useForm<CreateData>({
    resolver: zodResolver(createSchema),
    defaultValues: { workspaceName: "" },
  })

  const { isSubmitting } = form.formState

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 1000))
    router.push("/app/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Criar workspace</h1>
        <p className="text-slate-500 text-sm">
          Dê um nome para sua empresa ou projeto no PipeFlow.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da empresa / workspace</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Acme Vendas" {...field} />
                </FormControl>
                <FormDescription>
                  Pode ser alterado depois nas configurações.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Voltar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSubmitting ? "Criando..." : "Criar workspace"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

function JoinStep({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<JoinData>({
    resolver: zodResolver(joinSchema),
    defaultValues: { inviteCode: "" },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: JoinData) {
    setError(null)
    await new Promise((r) => setTimeout(r, 1000))

    if (data.inviteCode !== "DEMO123") {
      setError("Código de convite inválido ou expirado.")
      return
    }

    router.push("/app/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Entrar com convite</h1>
        <p className="text-slate-500 text-sm">
          Insira o código de convite que você recebeu por e-mail.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="inviteCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de convite</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: DEMO123"
                    className="uppercase tracking-widest"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Voltar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSubmitting ? "Entrando..." : "Entrar no workspace"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export function OnboardingForm() {
  const [step, setStep] = useState<Step>("choice")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">PipeFlow</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {step === "choice" && <ChoiceStep onSelect={setStep} />}
          {step === "create" && <CreateStep onBack={() => setStep("choice")} />}
          {step === "join" && <JoinStep onBack={() => setStep("choice")} />}
        </div>
      </main>
    </div>
  )
}
