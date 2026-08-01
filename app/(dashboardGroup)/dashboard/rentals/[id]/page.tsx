import { Button } from "@/components/ui/button"
import { getRental } from "@/services/dashboard"
import { getGearItem } from "@/services/gear"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PaymentButton, ReviewForm } from "../../../_components/rental-actions"
import { StatusPill } from "../../../_components/status-pill"

export default async function RentalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rentalResult = await getRental(id)
  if (!rentalResult.success || !rentalResult.data) notFound()
  const rental = rentalResult.data
  const gearResult = await getGearItem(rental.gearItemId)

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div><Link href="/dashboard/rentals" className="text-sm font-semibold text-primary hover:underline">← Back to rentals</Link><h1 className="mt-3 font-heading text-3xl font-bold">Rental details</h1></div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div><p className="font-mono text-xs text-muted-foreground">{rental.id}</p><h2 className="mt-2 font-heading text-2xl font-semibold">{gearResult.data?.name ?? "Gear rental"}</h2><div className="mt-3 flex gap-2"><StatusPill status={rental.status} /><StatusPill status={rental.paymentStatus} /></div></div>
          <p className="font-heading text-3xl font-bold">${rental.totalAmount.toFixed(2)}</p>
        </div>
        <dl className="grid gap-5 py-6 text-sm sm:grid-cols-2">
          <div><dt className="text-muted-foreground">Start date</dt><dd className="font-semibold">{new Date(rental.startDate).toLocaleString()}</dd></div>
          <div><dt className="text-muted-foreground">End date</dt><dd className="font-semibold">{new Date(rental.endDate).toLocaleString()}</dd></div>
          <div><dt className="text-muted-foreground">Quantity</dt><dd className="font-semibold">{rental.quantity}</dd></div>
          <div><dt className="text-muted-foreground">Gear ID</dt><dd className="break-all font-mono text-xs">{rental.gearItemId}</dd></div>
        </dl>
        <div className="flex flex-wrap gap-3 border-t pt-5">
          {gearResult.data && <Button asChild variant="outline" className="rounded-md"><Link href={`/gear/${rental.gearItemId}`}>View gear</Link></Button>}
          <PaymentButton rental={rental} />
        </div>
        {rental.status === "RETURNED" && <div className="mt-5"><ReviewForm rentalId={rental.id} /></div>}
      </div>
    </div>
  )
}

