"use client"

import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  const { resolvedTheme } = useTheme()
  return (
    <SonnerToaster
      theme={resolvedTheme as "light" | "dark" | undefined}
      richColors
      position="bottom-right"
      toastOptions={{ duration: 3000 }}
    />
  )
}
