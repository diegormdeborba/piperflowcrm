import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    period: "para sempre",
    description: "Perfeito para freelancers e times pequenos que estão começando.",
    cta: "Começar grátis",
    ctaHref: "/register",
    highlight: false,
    features: [
      "Até 2 colaboradores",
      "Até 50 leads",
      "Pipeline Kanban completo",
      "Registro de atividades",
      "1 workspace",
      "Dashboard de métricas",
    ],
    missing: ["Workspaces ilimitados", "Suporte prioritário", "Integrações avançadas"],
  },
  {
    name: "Pro",
    price: "R$ 49",
    period: "por mês",
    description: "Para times em crescimento que precisam de escala e mais colaboradores.",
    cta: "Assinar Pro",
    ctaHref: "/register?plan=pro",
    highlight: true,
    features: [
      "Colaboradores ilimitados",
      "Leads ilimitados",
      "Pipeline Kanban completo",
      "Registro de atividades",
      "Workspaces ilimitados",
      "Dashboard de métricas",
      "Convites por e-mail",
      "Suporte prioritário",
      "Integrações via API",
    ],
    missing: [],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Planos</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Preço justo, sem surpresas
          </h2>
          <p className="mt-4 text-slate-400">
            Comece grátis e faça upgrade quando precisar. Sem fidelidade, cancele quando quiser.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "border-2 border-blue-500 bg-blue-950/30"
                  : "border border-white/10 bg-slate-800/50"
              }`}
            >
              {plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white">
                  <Zap className="mr-1 h-3 w-3" />
                  Mais popular
                </Badge>
              )}

              <div>
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="mb-1 text-sm text-slate-400">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              </div>

              <Button
                className={`mt-6 w-full ${
                  plan.highlight
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "border-white/20 bg-transparent text-white hover:bg-white/10"
                }`}
                variant={plan.highlight ? "default" : "outline"}
                asChild
              >
                <Link href={plan.ctaHref}>{plan.cta}</Link>
              </Button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                    {feature}
                  </li>
                ))}
                {plan.missing.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 line-through">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-700" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Pagamento via cartão de crédito. Cancele a qualquer momento pelo portal do cliente.
        </p>
      </div>
    </section>
  );
}
