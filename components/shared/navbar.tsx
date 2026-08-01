"use client"

import { Button } from "@/components/ui/button"
import type { User } from "@/lib/types"
import { logOut } from "@/services/logout"
import { LayoutDashboard, LogOut, Menu, Mountain, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const navItems = [
  { label: "Browse gear", href: "/gear" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/about" },
]

function dashboardPath(role?: User["role"]) {
  if (role === "ADMIN") return "/admin-dashboard"
  if (role === "PROVIDER") return "/provider-dashboard"
  return "/dashboard"
}

export function Navbar({ user }: { user?: User }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    await logOut()
    setMobileOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mountain className="size-5" />
          </div>
          <span className="font-heading text-xl font-bold">GearUp</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="outline" className="hidden rounded-md sm:inline-flex">
                <Link href={dashboardPath(user.role)}>
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="ghost" className="hidden rounded-md sm:inline-flex">
                <LogOut />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden rounded-md sm:inline-flex">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-md">
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link key={item.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" href={item.href}>
                {item.label}
              </Link>
            ))}
            {user && (
              <>
                <Link onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" href={dashboardPath(user.role)}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-muted">
                  Sign out
                </button>
              </>
            )}
            {!user && <Link onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" href="/login">Sign in</Link>}
          </div>
        </div>
      )}
    </header>
  )
}
