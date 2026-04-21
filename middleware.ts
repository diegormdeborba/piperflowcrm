import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password"]
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const mockSession = request.cookies.get("mock-session")?.value

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/api")
  )

  if (!isPublicRoute && !mockSession) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthRoute && mockSession) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
