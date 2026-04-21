import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PipeFlow</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              CRM simples e poderoso para times de vendas que querem crescer.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Produto</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#features" className="hover:text-white">Funcionalidades</Link></li>
              <li><Link href="#pipeline" className="hover:text-white">Pipeline Kanban</Link></li>
              <li><Link href="#pricing" className="hover:text-white">Planos e preços</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Empresa</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white">Sobre nós</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Contato</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white">Privacidade</Link></li>
              <li><Link href="#" className="hover:text-white">Termos de uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PipeFlow CRM. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
