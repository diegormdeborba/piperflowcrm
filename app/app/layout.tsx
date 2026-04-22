import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { UserProvider } from "@/components/providers/user-provider"
import { Sidebar } from "@/components/app/sidebar"
import { Header } from "@/components/app/header"

const ACTIVE_WORKSPACE_COOKIE = "piperflow_active_workspace"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("role, workspaces(id, name, plan)")
    .eq("user_id", user.id)

  if (!memberships || memberships.length === 0) redirect("/onboarding")

  const allWorkspaces = memberships
    .map((m) => {
      const ws = Array.isArray(m.workspaces) ? m.workspaces[0] : m.workspaces
      return ws ? { id: ws.id, name: ws.name, plan: ws.plan as "free" | "pro" } : null
    })
    .filter(Boolean) as { id: string; name: string; plan: "free" | "pro" }[]

  const cookieStore = await cookies()
  const activeId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value

  const activeMembership =
    (activeId && memberships.find((m) => {
      const ws = Array.isArray(m.workspaces) ? m.workspaces[0] : m.workspaces
      return ws?.id === activeId
    })) || memberships[0]

  const activeWs = Array.isArray(activeMembership.workspaces)
    ? activeMembership.workspaces[0]
    : activeMembership.workspaces

  const fullName: string =
    (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "Usuário"
  const email = user.email ?? ""
  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <UserProvider
      user={{ id: user.id, name: fullName, email, avatarFallback: initials }}
      workspace={
        activeWs
          ? { id: activeWs.id, name: activeWs.name, plan: activeWs.plan as "free" | "pro" }
          : null
      }
      role={activeMembership.role as "admin" | "member"}
      allWorkspaces={allWorkspaces}
    >
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
    </UserProvider>
  )
}
