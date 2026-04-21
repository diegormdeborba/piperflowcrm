import type { Metadata } from "next";
import { Header } from "@/components/marketing/header";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { PipelineSection } from "@/components/marketing/pipeline-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "PipeFlow CRM — O CRM que o seu time realmente vai usar",
  description:
    "Gerencie leads, acompanhe negócios no pipeline Kanban, registre atividades e feche mais vendas. Comece grátis, sem cartão de crédito.",
  keywords: ["CRM", "pipeline de vendas", "gestão de leads", "kanban", "vendas", "SaaS"],
  openGraph: {
    title: "PipeFlow CRM — O CRM que o seu time realmente vai usar",
    description:
      "Pipeline Kanban visual, gestão de leads e métricas de vendas. Grátis para começar.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "PipeFlow CRM",
    description: "Pipeline Kanban visual, gestão de leads e métricas de vendas.",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PipelineSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
