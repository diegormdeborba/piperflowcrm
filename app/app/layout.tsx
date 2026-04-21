import { Sidebar } from "@/components/app/sidebar"
import { Header } from "@/components/app/header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
