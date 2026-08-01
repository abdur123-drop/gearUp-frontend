import { getAdminRentals } from "@/services/dashboard"
import { getGear } from "@/services/gear"
import { StatusPill } from "../../_components/status-pill"

export const metadata = { title: "All rentals" }

export default async function AdminRentalsPage() {
  const [result, gearResult] = await Promise.all([getAdminRentals(), getGear({ limit: 100 })])
  const rentals = result.data ?? []
  const gear = gearResult.data ?? []

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Administration</p><h1 className="font-heading text-3xl font-bold">All rentals</h1><p className="mt-1 text-sm text-muted-foreground">Read-only visibility into marketplace orders and payment state.</p></div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Gear</th><th className="px-5 py-4">Dates</th><th className="px-5 py-4">Order status</th><th className="px-5 py-4">Payment</th><th className="px-5 py-4 text-right">Total</th></tr></thead>
            <tbody className="divide-y">
              {rentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-muted/20">
                  <td className="px-5 py-4"><p className="font-mono text-xs">{rental.id}</p><p className="mt-1 text-xs text-muted-foreground">Qty {rental.quantity}</p></td>
                  <td className="px-5 py-4">{gear.find((item) => item.id === rental.gearItemId)?.name ?? rental.gearItemId.slice(0, 8)}</td>
                  <td className="px-5 py-4 text-xs">{new Date(rental.startDate).toLocaleDateString()} – {new Date(rental.endDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4"><StatusPill status={rental.status} /></td>
                  <td className="px-5 py-4"><StatusPill status={rental.paymentStatus} /></td>
                  <td className="px-5 py-4 text-right font-semibold">${rental.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rentals.length && <div className="p-10 text-center text-sm text-muted-foreground">{result.message}</div>}
      </div>
    </div>
  )
}
