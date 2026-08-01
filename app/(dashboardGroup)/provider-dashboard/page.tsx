import { getProviderGear } from "@/services/dashboard"
import { getMe } from "@/services/getMe"
import { Boxes, CircleDollarSign, PackageCheck, PackageX } from "lucide-react"
import Link from "next/link"
import { StatCard } from "../_components/stat-card"

export const metadata = { title: "Provider dashboard" }

export default async function ProviderDashboardPage() {
  const userResult = await getMe()
  const gearResult = userResult.data ? await getProviderGear(userResult.data.id) : { data: [] }
  const gear = gearResult.data ?? []
  const inventoryValue = gear.reduce((sum, item) => sum + item.pricePerDay * item.availableStock, 0)

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Provider dashboard</p><h1 className="font-heading text-3xl font-bold">Welcome, {userResult.data?.name ?? "provider"}</h1><p className="mt-1 text-sm text-muted-foreground">Manage your marketplace inventory and rental handoffs.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Listings" value={gear.length} detail="Gear you have listed" icon={Boxes} />
        <StatCard label="Available units" value={gear.reduce((sum, item) => sum + item.availableStock, 0)} detail="Ready to rent now" icon={PackageCheck} />
        <StatCard label="Unavailable listings" value={gear.filter((item) => !item.isAvailable || item.availableStock === 0).length} detail="Need restock or attention" icon={PackageX} />
        <StatCard label="Daily inventory value" value={`$${inventoryValue.toFixed(2)}`} detail="If all available units rent" icon={CircleDollarSign} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Link href="/provider-dashboard/gear" className="rounded-xl border bg-card p-6 transition hover:border-primary/50 hover:shadow-md"><Boxes className="size-7 text-primary" /><h2 className="mt-4 font-heading text-xl font-semibold">Manage gear</h2><p className="mt-2 text-sm text-muted-foreground">Create, edit, and remove your marketplace listings.</p></Link>
        <Link href="/provider-dashboard/rentals" className="rounded-xl border bg-card p-6 transition hover:border-primary/50 hover:shadow-md"><PackageCheck className="size-7 text-primary" /><h2 className="mt-4 font-heading text-xl font-semibold">Rental lookup</h2><p className="mt-2 text-sm text-muted-foreground">Find an order by ID and update its fulfillment status.</p></Link>
      </div>
    </div>
  )
}

