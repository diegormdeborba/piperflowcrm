import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { UserProvider } from "@/components/providers/user-provider"
import { Sidebar } from "@/components/app/sidebar"
import { Header } from "@/components/app/header"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: memberData } = await supabase
    .from("workspace_members")
    .select("role, workspaces(id, name, plan)")
    .eq("user_id", user.id)
    .limit(1)
    .single()

  const workspace = memberData?.workspaces
    ? Array.isArray(memberData.workspaces)
      ? memberData.workspaces[0]
      : memberData.workspaces
    : null

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
        workspace
          ? { id: workspace.id, name: workspace.name, plan: workspace.plan }
          : null
      }
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
