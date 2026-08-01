import { getAdminGear, getAdminRentals, getAdminUsers } from "@/services/dashboard"
import { getCategories } from "@/services/gear"
import { Boxes, FolderTree, ReceiptText, Users } from "lucide-react"
import Link from "next/link"
import { StatCard } from "../_components/stat-card"
import { StatusPill } from "../_components/status-pill"

export const metadata = { title: "Admin dashboard" }

export default async function AdminDashboardPage() {
  const [usersResult, gearResult, rentalsResult, categoryResult] = await Promise.all([
    getAdminUsers(),
    getAdminGear(),
    getAdminRentals(),
    getCategories(),
  ])
  const users = usersResult.data ?? []
  const gear = gearResult.data ?? []
  const rentals = rentalsResult.data ?? []
  const categories = categoryResult.data ?? []

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Administration</p><h1 className="font-heading text-3xl font-bold">Marketplace overview</h1><p className="mt-1 text-sm text-muted-foreground">Monitor users, inventory, categories, and rental activity.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={users.length} detail={`${users.filter((user) => user.status === "SUSPENDED").length} suspended`} icon={Users} />
        <StatCard label="Gear listings" value={gear.length} detail={`${gear.filter((item) => item.isAvailable).length} available`} icon={Boxes} />
        <StatCard label="Rentals" value={rentals.length} detail={`${rentals.filter((item) => item.paymentStatus === "COMPLETED").length} paid`} icon={ReceiptText} />
        <StatCard label="Categories" value={categories.length} detail="Marketplace collections" icon={FolderTree} />
      </div>
      <section className="rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b p-5"><div><h2 className="font-heading text-lg font-semibold">Recent rentals</h2><p className="text-xs text-muted-foreground">Latest marketplace order activity</p></div><Link href="/admin-dashboard/rentals" className="text-sm font-semibold text-primary hover:underline">View all</Link></div>
        <div className="divide-y">
          {rentals.slice(-5).reverse().map((rental) => (
            <div key={rental.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono text-xs text-muted-foreground">{rental.id}</p><p className="mt-1 text-sm font-semibold">${rental.totalAmount.toFixed(2)} · {rental.quantity} unit{rental.quantity === 1 ? "" : "s"}</p></div><div className="flex gap-2"><StatusPill status={rental.status} /><StatusPill status={rental.paymentStatus} /></div></div>
          ))}
          {!rentals.length && <div className="p-10 text-center text-sm text-muted-foreground">No rental activity yet.</div>}
        </div>
      </section>
    </div>
  )
}

