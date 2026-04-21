"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">PipeFlow</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-slate-300 transition-colors hover:text-white">
            Funcionalidades
          </Link>
          <Link href="#pipeline" className="text-sm text-slate-300 transition-colors hover:text-white">
            Pipeline
          </Link>
          <Link href="#pricing" className="text-sm text-slate-300 transition-colors hover:text-white">
            Planos
          </Link>
        </nav>

        {/* CTAs desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-slate-300 hover:text-white" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" asChild>
            <Link href="/register">Começar grátis</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-slate-300 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-900 px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="#features" className="text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Funcionalidades
            </Link>
            <Link href="#pipeline" className="text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Pipeline
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Planos
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="border-white/20 text-white" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-600" asChild>
                <Link href="/register">Começar grátis</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
