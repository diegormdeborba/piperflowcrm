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

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  remember: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: FormData) {
    setError(null)
    await new Promise((r) => setTimeout(r, 1000))

    if (data.email === "erro@teste.com") {
      setError("E-mail ou senha incorretos. Tente novamente.")
      return
    }

    document.cookie = "mock-session=true; path=/"
    router.push("/app/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Entrar na sua conta</h1>
        <p className="text-slate-500 text-sm">
          Não tem conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Cadastre-se grátis
          </Link>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Senha</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal text-slate-600 cursor-pointer">
                  Manter conectado
                </FormLabel>
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
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
