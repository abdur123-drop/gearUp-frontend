import { StatCard } from "../_components/stat-card"
import { StatusPill } from "../_components/status-pill"
import { getMyRentals, getPaymentHistory } from "@/services/dashboard"
import { getMe } from "@/services/getMe"
import { CalendarDays, CircleDollarSign, PackageCheck, ReceiptText } from "lucide-react"
import Link from "next/link"

export const metadata = { title: "Customer dashboard" }

export default async function CustomerDashboardPage() {
  const [userResult, rentalResult, paymentResult] = await Promise.all([
    getMe(),
    getMyRentals(),
    getPaymentHistory(),
  ])
  const rentals = rentalResult.data ?? []
  const payments = paymentResult.data ?? []
  const activeRentals = rentals.filter((rental) => !["RETURNED", "CANCELLED"].includes(rental.status))
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-muted-foreground">Customer dashboard</p>
        <h1 className="font-heading text-3xl font-bold">Welcome back, {userResult.data?.name ?? "adventurer"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your equipment, checkout, and completed adventures.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="All rentals" value={rentals.length} detail="Your complete order history" icon={ReceiptText} />
        <StatCard label="Active rentals" value={activeRentals.length} detail="Orders still in progress" icon={PackageCheck} />
        <StatCard label="Completed payments" value={payments.length} detail="Successful Stripe payments" icon={CircleDollarSign} />
        <StatCard label="Total paid" value={`$${totalPaid.toFixed(2)}`} detail="Across completed checkouts" icon={CalendarDays} />
      </div>

      <section className="rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b p-5">
          <div><h2 className="font-heading text-lg font-semibold">Recent rentals</h2><p className="text-xs text-muted-foreground">Your latest orders and payment state</p></div>
          <Link href="/dashboard/rentals" className="text-sm font-semibold text-primary hover:underline">View all</Link>
        </div>
        {rentals.length ? (
          <div className="divide-y">
            {rentals.slice(0, 5).map((rental) => (
              <Link key={rental.id} href={`/dashboard/rentals/${rental.id}`} className="flex flex-col gap-3 p-5 hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-mono text-xs text-muted-foreground">{rental.id}</p><p className="mt-1 text-sm font-semibold">{rental.quantity} item{rental.quantity === 1 ? "" : "s"} · ${rental.totalAmount.toFixed(2)}</p></div>
                <div className="flex items-center gap-2"><StatusPill status={rental.status} /><StatusPill status={rental.paymentStatus} /></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-sm text-muted-foreground">No rentals yet. <Link href="/gear" className="font-semibold text-primary">Browse gear</Link> to get started.</div>
        )}
      </section>
    </div>
  )
}

