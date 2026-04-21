"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, ArrowLeft, MailCheck } from "lucide-react"

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

const schema = z.object({
  email: z.string().email("E-mail inválido"),
})

type FormData = z.infer<typeof schema>

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false)
  const [sentEmail, setSentEmail] = useState("")

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 1000))
    setSentEmail(data.email)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <MailCheck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">E-mail enviado!</h1>
          <p className="text-slate-500 text-sm">
            Enviamos um link de recuperação para{" "}
            <span className="font-medium text-slate-700">{sentEmail}</span>.
            <br />
            Verifique sua caixa de entrada e spam.
          </p>
        </div>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setSent(false)}
          >
            Tentar outro e-mail
          </Button>
          <Link href="/login">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Esqueceu sua senha?</h1>
        <p className="text-slate-500 text-sm">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
          </Button>
        </form>
      </Form>

      <Link href="/login">
        <Button variant="ghost" className="w-full text-slate-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o login
        </Button>
      </Link>
    </div>
  )
}
