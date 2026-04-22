"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, {
      message: "Você deve aceitar os termos de uso",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof schema>

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: FormData) {
    setError(null)
    await new Promise((r) => setTimeout(r, 1200))

    // Mock: simula e-mail já cadastrado. Removido no Milestone 8 (Supabase Auth).
    if (data.email === "existente@teste.com") {
      setError("Este e-mail já está em uso. Tente outro ou faça login.")
      return
    }

    document.cookie = "mock-session=true; path=/"
    router.push("/onboarding")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Criar conta grátis</h1>
        <p className="text-slate-500 text-sm">
          Já tem conta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Faça login
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-0">
                  <FormLabel className="text-sm font-normal text-slate-600 leading-snug cursor-pointer">
                    Concordo com os{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Política de Privacidade
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSubmitting ? "Criando conta..." : "Criar conta grátis"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
