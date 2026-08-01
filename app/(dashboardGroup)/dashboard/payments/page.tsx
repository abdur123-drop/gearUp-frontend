import { getPaymentHistory } from "@/services/dashboard"
import { CreditCard } from "lucide-react"
import Link from "next/link"
import { StatusPill } from "../../_components/status-pill"

export const metadata = { title: "Payment history" }

export default async function PaymentsPage() {
  const result = await getPaymentHistory()
  const payments = result.data ?? []

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Customer</p><h1 className="font-heading text-3xl font-bold">Payment history</h1><p className="mt-1 text-sm text-muted-foreground">Completed Stripe transactions for your rentals.</p></div>
      {payments.length ? (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-4">Payment</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Provider</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Amount</th></tr></thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/20">
                    <td className="px-5 py-4"><Link href={`/dashboard/payments/${payment.id}`} className="font-mono text-xs font-semibold text-primary hover:underline">{payment.id}</Link></td>
                    <td className="px-5 py-4">{new Date(payment.paidAt ?? payment.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">{payment.provider}</td>
                    <td className="px-5 py-4"><StatusPill status={payment.status} /></td>
                    <td className="px-5 py-4 text-right font-semibold">${payment.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center"><CreditCard className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-3 font-heading text-xl font-semibold">No completed payments</h2><p className="mt-1 text-sm text-muted-foreground">{result.message}</p></div>
      )}
    </div>
  )
}

