import { CheckCircle2, MoveRight } from "lucide-react";

const stages = [
  { label: "Novo Lead", color: "border-slate-500 bg-slate-800", dot: "bg-slate-400" },
  { label: "Contato Realizado", color: "border-blue-500/50 bg-blue-950/50", dot: "bg-blue-400" },
  { label: "Proposta Enviada", color: "border-violet-500/50 bg-violet-950/50", dot: "bg-violet-400" },
  { label: "Negociação", color: "border-orange-500/50 bg-orange-950/50", dot: "bg-orange-400" },
  { label: "Fechado Ganho", color: "border-green-500/50 bg-green-950/50", dot: "bg-green-400" },
];

const cards = [
  { stage: 0, title: "Agência Criativa", value: "R$ 4.500", owner: "M", days: "há 2 dias" },
  { stage: 0, title: "Tech Solutions Ltda", value: "R$ 12.000", owner: "J", days: "há 5 dias" },
  { stage: 1, title: "Construtora Norte", value: "R$ 8.700", owner: "A", days: "hoje" },
  { stage: 1, title: "Studio Design", value: "R$ 3.200", owner: "M", days: "ontem" },
  { stage: 2, title: "Fintech Capital", value: "R$ 25.000", owner: "J", days: "há 3 dias" },
  { stage: 3, title: "MedGroup SA", value: "R$ 18.000", owner: "A", days: "há 1 dia" },
  { stage: 4, title: "Loja Virtual XP", value: "R$ 6.800", owner: "M", days: "hoje" },
];

const ownerColors: Record<string, string> = {
  M: "bg-blue-500",
  J: "bg-violet-500",
  A: "bg-emerald-500",
};

export function PipelineSection() {
  return (
    <section id="pipeline" className="overflow-hidden bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Pipeline Kanban
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Seu funil de vendas em um único olhar
          </h2>
          <p className="mt-4 text-slate-400">
            Arraste e solte negócios entre as etapas. Cada movimento é salvo automaticamente.
          </p>
        </div>

        {/* Flow arrows */}
        <div className="mt-12 hidden items-center justify-center gap-1 md:flex">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-1">
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-800 px-3 py-1.5">
                <div className={`h-2 w-2 rounded-full ${stage.dot}`} />
                <span className="text-xs text-slate-300">{stage.label}</span>
              </div>
              {i < stages.length - 1 && (
                <MoveRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
              )}
            </div>
          ))}
          <div className="flex items-center gap-1">
            <MoveRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
            <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/30 px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-xs text-slate-300">Fechado Perdido</span>
            </div>
          </div>
        </div>

        {/* Kanban board */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="flex min-w-max gap-4">
            {stages.map((stage, stageIndex) => {
              const stageCards = cards.filter((c) => c.stage === stageIndex);
              const total = stageCards.reduce((sum, c) => {
                const val = parseFloat(c.value.replace("R$ ", "").replace(".", "").replace(",", "."));
                return sum + val;
              }, 0);

              return (
                <div key={stage.label} className="w-52 flex-shrink-0">
                  {/* Column header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${stage.dot}`} />
                      <span className="text-xs font-medium text-slate-300">{stage.label}</span>
                    </div>
                    <span className="rounded-full bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">
                      {stageCards.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-2">
                    {stageCards.map((card, i) => (
                      <div
                        key={i}
                        className={`rounded-lg border p-3 transition-transform hover:scale-[1.02] ${stage.color}`}
                      >
                        <p className="text-xs font-semibold text-white">{card.title}</p>
                        <p className="mt-1 text-sm font-bold text-green-400">{card.value}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500">{card.days}</span>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white ${ownerColors[card.owner]}`}
                          >
                            {card.owner}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Column total */}
                    {stageCards.length > 0 && (
                      <div className="rounded-md bg-slate-800/50 px-2 py-1 text-center">
                        <span className="text-[10px] text-slate-500">
                          Total: R$ {total.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            "Drag-and-drop com persistência automática",
            "Valor total por etapa em tempo real",
            "Filtro por responsável com um clique",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
              <span className="text-sm text-slate-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
