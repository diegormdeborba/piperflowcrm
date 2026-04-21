"use client"

import { useRouter } from "next/navigation"
import { LogOut, Settings, User } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MOCK_USER } from "@/lib/mock-data"

export function UserMenu() {
  const router = useRouter()

  function handleLogout() {
    document.cookie = "mock-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent transition-colors outline-none">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {MOCK_USER.avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left min-w-0">
            <p className="text-xs font-medium leading-none truncate max-w-[120px]">{MOCK_USER.name}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[120px]">{MOCK_USER.email}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{MOCK_USER.name}</p>
            <p className="text-xs text-muted-foreground">{MOCK_USER.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <User className="h-4 w-4" />
          Meu perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={() => router.push("/app/settings")}>
          <Settings className="h-4 w-4" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
