import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Criar conta — PipeFlow CRM",
  description: "Crie sua conta grátis no PipeFlow CRM.",
}

export default function RegisterPage() {
  return <RegisterForm />
}
