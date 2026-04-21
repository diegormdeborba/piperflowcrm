import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 pb-20 pt-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge className="mb-6 border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
            🚀 Agora com plano Free para sempre
          </Badge>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            O CRM que o seu time{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              realmente vai usar
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            Gerencie leads, acompanhe negócios no pipeline Kanban, registre atividades e feche mais
            vendas — sem planilha, sem confusão, sem custo absurdo.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 bg-blue-500 px-8 text-white hover:bg-blue-600" asChild>
              <Link href="/register">
                Começar grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link href="#pipeline">
                <Play className="h-4 w-4 fill-current" />
                Ver como funciona
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Sem cartão de crédito. Sem prazo de trial. Free para sempre.
          </p>

          {/* Dashboard mockup */}
          <div className="relative mt-16 w-full max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800 shadow-2xl shadow-blue-500/10">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
                <div className="ml-4 h-5 w-48 rounded bg-slate-700" />
              </div>

              {/* App layout mockup */}
              <div className="flex h-[340px]">
                {/* Sidebar mockup */}
                <div className="hidden w-52 flex-shrink-0 border-r border-white/10 bg-slate-900 p-3 sm:flex sm:flex-col sm:gap-1">
                  <div className="mb-3 flex items-center gap-2 rounded-md bg-slate-800 px-2 py-1.5">
                    <div className="h-4 w-4 rounded bg-blue-500/50" />
                    <div className="h-3 w-20 rounded bg-slate-600" />
                  </div>
                  {["Dashboard", "Leads", "Pipeline", "Atividades"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-500"
                    >
                      <div className="h-3.5 w-3.5 rounded bg-slate-700" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content mockup — mini kanban */}
                <div className="flex flex-1 gap-3 overflow-x-auto p-4">
                  {[
                    { label: "Novo Lead", color: "bg-slate-600", cards: 3 },
                    { label: "Contato", color: "bg-blue-500/60", cards: 2 },
                    { label: "Proposta", color: "bg-violet-500/60", cards: 2 },
                    { label: "Negociação", color: "bg-orange-500/60", cards: 1 },
                    { label: "Fechado ✓", color: "bg-green-500/60", cards: 2 },
                  ].map((col) => (
                    <div key={col.label} className="flex w-36 flex-shrink-0 flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${col.color}`} />
                        <span className="text-[10px] font-medium text-slate-400">{col.label}</span>
                      </div>
                      {Array.from({ length: col.cards }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-white/10 bg-slate-700/60 p-2.5"
                        >
                          <div className="mb-1.5 h-2.5 w-full rounded bg-slate-600" />
                          <div className="mb-2 h-2 w-3/4 rounded bg-slate-600" />
                          <div className="flex items-center justify-between">
                            <div className="h-2 w-10 rounded bg-green-500/40" />
                            <div className="h-4 w-4 rounded-full bg-blue-500/50" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-blue-500/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
