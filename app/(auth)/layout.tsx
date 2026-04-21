import Link from "next/link"
import { BarChart3, CheckCircle2 } from "lucide-react"

const features = [
  "Pipeline Kanban visual com drag-and-drop",
  "Gestão completa de leads e negócios",
  "Dashboard com métricas em tempo real",
  "Multi-empresa com controle de acesso",
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PipeFlow</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Organize suas vendas,{" "}
              <span className="text-blue-400">feche mais negócios.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              O CRM feito para times que querem crescer sem complicar.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-slate-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} PipeFlow CRM. Todos os direitos reservados.
          </p>
        </div>

        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">PipeFlow</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
