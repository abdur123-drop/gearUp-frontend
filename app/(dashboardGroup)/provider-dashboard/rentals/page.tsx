import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getRental } from "@/services/dashboard"
import { getGearItem } from "@/services/gear"
import { Search } from "lucide-react"
import { RentalStatusForm } from "../../_components/rental-status-form"
import { StatusPill } from "../../_components/status-pill"

export const metadata = { title: "Rental lookup" }

export default async function ProviderRentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const rentalResult = id ? await getRental(id) : undefined
  const rental = rentalResult?.data
  const gearResult = rental ? await getGearItem(rental.gearItemId) : undefined

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Provider</p><h1 className="font-heading text-3xl font-bold">Rental lookup</h1><p className="mt-1 max-w-2xl text-sm text-muted-foreground">The backend does not expose a provider rental list. Enter an order ID supplied by the customer to view it and update fulfillment.</p></div>
      <form className="flex max-w-2xl gap-2 rounded-xl border bg-card p-4">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-10 rounded-md pl-9 text-sm" name="id" defaultValue={id} placeholder="Rental order UUID" required /></div>
        <Button className="h-10 rounded-md">Look up</Button>
      </form>
      {id && !rental && <div className="max-w-2xl rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">{rentalResult?.message ?? "Rental not found."}</div>}
      {rental && (
        <article className="max-w-3xl rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div><p className="font-mono text-xs text-muted-foreground">{rental.id}</p><h2 className="mt-2 font-heading text-2xl font-semibold">{gearResult?.data?.name ?? "Gear rental"}</h2><div className="mt-3 flex gap-2"><StatusPill status={rental.status} /><StatusPill status={rental.paymentStatus} /></div></div>
            <p className="font-heading text-2xl font-bold">${rental.totalAmount.toFixed(2)}</p>
          </div>
          <dl className="grid gap-4 py-5 text-sm sm:grid-cols-2">
            <div><dt className="text-muted-foreground">Quantity</dt><dd className="font-semibold">{rental.quantity}</dd></div>
            <div><dt className="text-muted-foreground">Customer ID</dt><dd className="break-all font-mono text-xs">{rental.customerId}</dd></div>
            <div><dt className="text-muted-foreground">Start</dt><dd className="font-semibold">{new Date(rental.startDate).toLocaleDateString()}</dd></div>
            <div><dt className="text-muted-foreground">End</dt><dd className="font-semibold">{new Date(rental.endDate).toLocaleDateString()}</dd></div>
          </dl>
          <RentalStatusForm rentalId={rental.id} currentStatus={rental.status} />
        </article>
      )}
    </div>
  )
}
