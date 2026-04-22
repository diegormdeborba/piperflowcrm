"use client"

import { createContext, useContext } from "react"

export type AuthUser = {
  id: string
  name: string
  email: string
  avatarFallback: string
}

export type WorkspaceInfo = {
  id: string
  name: string
  plan: "free" | "pro"
}

type UserContextValue = {
  user: AuthUser
  workspace: WorkspaceInfo | null
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({
  user,
  workspace,
  children,
}: UserContextValue & { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={{ user, workspace }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useUser must be used within UserProvider")
  return ctx
}
