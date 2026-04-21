import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Redefinir senha — PipeFlow CRM",
  description: "Redefina sua senha no PipeFlow CRM.",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
