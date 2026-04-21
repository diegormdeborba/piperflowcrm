import type { Metadata } from "next"
import { OnboardingForm } from "@/components/auth/onboarding-form"

export const metadata: Metadata = {
  title: "Bem-vindo — PipeFlow CRM",
  description: "Configure seu workspace no PipeFlow CRM.",
}

export default function OnboardingPage() {
  return <OnboardingForm />
}
