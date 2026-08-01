import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { Role } from "@/lib/types"

const protectedPrefixes = ["/dashboard", "/provider-dashboard", "/admin-dashboard"]

function tokenRole(token?: string): Role | undefined {
  if (!token) return undefined
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8"),
    ) as { data?: { role?: Role }; role?: Role }
    return payload.data?.role ?? payload.role
  } catch {
    return undefined
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("accessToken")?.value
  const role = tokenRole(token)

  if (!token && protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    const destination =
      role === "ADMIN" ? "/admin-dashboard" : role === "PROVIDER" ? "/provider-dashboard" : "/dashboard"
    return NextResponse.redirect(new URL(destination, request.url))
  }

  if (pathname.startsWith("/admin-dashboard") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (pathname.startsWith("/provider-dashboard") && role !== "PROVIDER") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (pathname.startsWith("/dashboard") && role !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/provider-dashboard/:path*", "/admin-dashboard/:path*", "/login", "/register"],
}
