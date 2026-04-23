"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STAGE_CONFIG, STAGES } from "@/components/pipeline/stage-config"
import type { Lead } from "@/types"

export const dealSchema = z.object({
  title:    z.string().min(2, "Título obrigatório"),
  value:    z.number().min(0).nullable(),
  lead_id:  z.string().nullable().optional(),
  stage:    z.enum(["new_lead", "contacted", "proposal_sent", "negotiation", "won", "lost"] as const),
  due_date: z.string().nullable().optional(),
})

export type DealFormData = z.infer<typeof dealSchema>

interface DealFormProps {
  defaultValues?: Partial<DealFormData>
  leads: Lead[]
  onSubmit: (data: DealFormData) => Promise<void>
  onCancel: () => void
}

function CurrencyInput({ value, onChange, onBlur, name, ref: inputRef }: {
  value: number | null
  onChange: (v: number | null) => void
  onBlur: () => void
  name: string
  ref?: React.Ref<HTMLInputElement>
}) {
  const toDisplay = (v: number | null) =>
    v != null ? v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""

  const [display, setDisplay] = useState(() => toDisplay(value))

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // permite dígitos, vírgula e ponto
    const raw = e.target.value.replace(/[^\d,.]/g, "")
    setDisplay(raw)
  }

  function handleBlur() {
    if (!display.trim()) {
      onChange(null)
      setDisplay("")
    } else {
      // "1.500,50" → 1500.50  /  "1500,50" → 1500.50  /  "1500.50" → 1500.50
      const normalized = display.replace(/\./g, "").replace(",", ".")
      const num = parseFloat(normalized)
      if (!isNaN(num) && num >= 0) {
        onChange(num)
        setDisplay(toDisplay(num))
      } else {
        onChange(null)
        setDisplay("")
      }
    }
    onBlur()
  }

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
        R$
      </span>
      <Input
        ref={inputRef}
        name={name}
        inputMode="decimal"
        placeholder="0,00"
        className="pl-9"
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}

export function DealForm({ defaultValues, leads, onSubmit, onCancel }: DealFormProps) {
  const form = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title:    "",
      value:    null,
      lead_id:  null,
      stage:    "new_lead",
      due_date: null,
      ...defaultValues,
    },
  })

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título *</FormLabel>
                <FormControl><Input placeholder="Ex: Renovação de contrato" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <CurrencyInput
                    value={field.value ?? null}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lead_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead vinculado</FormLabel>
                <Select value={field.value ?? "none"} onValueChange={(v) => field.onChange(v === "none" ? null : v)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar lead" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">— Nenhum —</SelectItem>
                    {leads.map((lead) => (
                      <SelectItem key={lead.id} value={lead.id}>{lead.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etapa *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>{STAGE_CONFIG[stage].label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prazo</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 pt-2 border-t shrink-0">
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
