const testimonials = [
  {
    quote:
      "Antes usávamos planilha e perdíamos leads direto. Com o PipeFlow, o time inteiro tem visibilidade do pipeline e fechamos 30% mais negócios no primeiro mês.",
    name: "Carla Mendes",
    role: "Diretora Comercial",
    company: "Agência Impulso",
    initials: "CM",
    color: "bg-blue-500",
  },
  {
    quote:
      "Sou freelancer e atendo 4 clientes ao mesmo tempo. Os workspaces separados são perfeitos — cada cliente tem seu pipeline sem misturar nada.",
    name: "Rafael Torres",
    role: "Consultor de Marketing",
    company: "Solo",
    initials: "RT",
    color: "bg-violet-500",
  },
  {
    quote:
      "A interface é muito mais limpa que o HubSpot. A equipe adotou em menos de uma semana sem precisar de treinamento. Vale demais o Pro.",
    name: "Juliana Farias",
    role: "Head de Vendas",
    company: "FinTech Capital",
    initials: "JF",
    color: "bg-emerald-500",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Depoimentos
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Times que confiam no PipeFlow
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-white/10 bg-slate-800/50 p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-4 text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-5 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
