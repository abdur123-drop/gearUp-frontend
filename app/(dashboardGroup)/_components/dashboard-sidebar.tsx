"use client"

import type { Role } from "@/lib/types"
import { Mountain } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItemsByRole } from "../_config/nav-items"

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname()

  return (
    <aside className="border-b bg-muted/20 md:min-h-[calc(100vh-4rem)] md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <div className="hidden items-center gap-3 border-b p-5 md:flex">
        <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Mountain className="size-5" /></div>
        <div><p className="text-sm font-semibold">GearUp</p><p className="text-xs capitalize text-muted-foreground">{role.toLowerCase()} dashboard</p></div>
      </div>
      <nav className="flex gap-1 overflow-x-auto p-3 md:grid md:p-4">
        {navItemsByRole[role].map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/provider-dashboard" && item.href !== "/admin-dashboard" && pathname.startsWith(`${item.href}/`))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

