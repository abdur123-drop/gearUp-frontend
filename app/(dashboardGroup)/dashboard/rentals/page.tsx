import { Button } from "@/components/ui/button"
import { getMyRentals } from "@/services/dashboard"
import { getGear } from "@/services/gear"
import { PackageOpen } from "lucide-react"
import Link from "next/link"
import { PaymentButton, ReviewForm } from "../../_components/rental-actions"
import { StatusPill } from "../../_components/status-pill"

export const metadata = { title: "My rentals" }

export default async function MyRentalsPage() {
  const [rentalResult, gearResult] = await Promise.all([
    getMyRentals(),
    getGear({ limit: 100 }),
  ])
  const rentals = rentalResult.data ?? []
  const gear = gearResult.data ?? []

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm text-muted-foreground">Customer</p><h1 className="font-heading text-3xl font-bold">My rentals</h1><p className="mt-1 text-sm text-muted-foreground">Manage orders, payments, and reviews.</p></div>
        <Button asChild className="rounded-md"><Link href="/gear">Find more gear</Link></Button>
      </div>

      {rentals.length ? (
        <div className="grid gap-5">
          {rentals.map((rental) => {
            const item = gear.find((gearItem) => gearItem.id === rental.gearItemId)
            return (
              <article key={rental.id} className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2"><StatusPill status={rental.status} /><StatusPill status={rental.paymentStatus} /></div>
                    <h2 className="font-heading text-xl font-semibold">{item?.name ?? "Gear rental"}</h2>
                    <p className="font-mono text-xs text-muted-foreground">Order {rental.id}</p>
                  </div>
                  <p className="font-heading text-2xl font-bold">${rental.totalAmount.toFixed(2)}</p>
                </div>
                <div className="mt-5 grid gap-4 border-y py-4 text-sm sm:grid-cols-3">
                  <div><p className="text-xs text-muted-foreground">Rental dates</p><p className="font-medium">{new Date(rental.startDate).toLocaleDateString()} – {new Date(rental.endDate).toLocaleDateString()}</p></div>
                  <div><p className="text-xs text-muted-foreground">Quantity</p><p className="font-medium">{rental.quantity}</p></div>
                  <div><p className="text-xs text-muted-foreground">Placed</p><p className="font-medium">{new Date(rental.createdAt).toLocaleDateString()}</p></div>
                </div>
                <div className="mt-4 flex flex-wrap items-start gap-3">
                  <Button asChild variant="outline" className="rounded-md"><Link href={`/dashboard/rentals/${rental.id}`}>View details</Link></Button>
                  <PaymentButton rental={rental} />
                </div>
                {rental.status === "RETURNED" && <div className="mt-4"><ReviewForm rentalId={rental.id} /></div>}
              </article>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center"><PackageOpen className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-3 font-heading text-xl font-semibold">No rentals yet</h2><p className="mt-1 text-sm text-muted-foreground">{rentalResult.message}</p></div>
      )}
    </div>
  )
}

