import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Recuperar senha — PipeFlow CRM",
  description: "Recupere o acesso à sua conta no PipeFlow CRM.",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
