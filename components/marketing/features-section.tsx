import {
  KanbanSquare,
  Users,
  BarChart3,
  Building2,
  Bell,
  Puzzle,
} from "lucide-react";

const features = [
  {
    icon: KanbanSquare,
    title: "Pipeline Kanban Visual",
    description:
      "Arraste negócios entre etapas com drag-and-drop. Do primeiro contato ao fechamento, tudo em um único painel.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Gestão Completa de Leads",
    description:
      "Cadastro detalhado com nome, empresa, cargo e contatos. Timeline de atividades para nunca perder o histórico.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: BarChart3,
    title: "Dashboard de Métricas",
    description:
      "Visualize em tempo real o valor do pipeline, taxa de conversão e negócios próximos do prazo.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Building2,
    title: "Multi-empresa",
    description:
      "Workspaces separados para cada time ou cliente. Dados 100% isolados, ideal para freelancers e agências.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Bell,
    title: "Registro de Atividades",
    description:
      "Registre ligações, e-mails, reuniões e notas diretamente no lead. Nunca mais esqueça o que foi combinado.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Puzzle,
    title: "Integrações via API",
    description:
      "Conecte com as ferramentas que você já usa. API aberta e webhooks para automatizar seu processo de vendas.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Funcionalidades
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Tudo que você precisa para vender mais
          </h2>
          <p className="mt-4 text-slate-400">
            Sem complexidade desnecessária. Cada funcionalidade foi projetada para o fluxo real de
            um time de vendas.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-white/10 bg-slate-800/50 p-6 transition-all duration-200 hover:border-white/20 hover:bg-slate-800"
            >
              <div className={`inline-flex rounded-lg p-3 ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
