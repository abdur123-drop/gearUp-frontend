import type { NavItem, Role } from "@/lib/types"
import {
  Boxes,
  CreditCard,
  FolderTree,
  LayoutDashboard,
  PackageSearch,
  ReceiptText,
  Users,
} from "lucide-react"

const customerItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My rentals", href: "/dashboard/rentals", icon: ReceiptText },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
]

const providerItems: NavItem[] = [
  { label: "Overview", href: "/provider-dashboard", icon: LayoutDashboard },
  { label: "My gear", href: "/provider-dashboard/gear", icon: Boxes },
  { label: "Rental lookup", href: "/provider-dashboard/rentals", icon: PackageSearch },
]

const adminItems: NavItem[] = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin-dashboard/users", icon: Users },
  { label: "Categories", href: "/admin-dashboard/categories", icon: FolderTree },
  { label: "All gear", href: "/admin-dashboard/gear", icon: Boxes },
  { label: "All rentals", href: "/admin-dashboard/rentals", icon: ReceiptText },
]

export const navItemsByRole: Record<Role, NavItem[]> = {
  CUSTOMER: customerItems,
  PROVIDER: providerItems,
  ADMIN: adminItems,
}

export function dashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin-dashboard"
  if (role === "PROVIDER") return "/provider-dashboard"
  return "/dashboard"
}

