import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Entrar — PipeFlow CRM",
  description: "Acesse sua conta no PipeFlow CRM.",
}

export default function LoginPage() {
  return <LoginForm />
}
