import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-blue-600 py-24">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Pronto para organizar seu processo de vendas?
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Crie sua conta grátis agora. Sem cartão de crédito, sem limite de tempo.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="gap-2 bg-white px-10 text-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link href="/register">
              Começar grátis agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10"
            asChild
          >
            <Link href="#pricing">Ver planos</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-blue-200">
          Mais de 500 times de vendas já usam o PipeFlow. Junte-se a eles.
        </p>
      </div>
    </section>
  );
}
