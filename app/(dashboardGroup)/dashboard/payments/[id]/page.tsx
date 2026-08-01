import { getPaymentDetails } from "@/services/dashboard"
import Link from "next/link"
import { notFound } from "next/navigation"
import { StatusPill } from "../../../_components/status-pill"

export default async function PaymentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getPaymentDetails(id)
  if (!result.success || !result.data) notFound()
  const payment = result.data

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div><Link href="/dashboard/payments" className="text-sm font-semibold text-primary hover:underline">← Back to payments</Link><h1 className="mt-3 font-heading text-3xl font-bold">Payment receipt</h1></div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between border-b pb-5"><div><p className="text-sm text-muted-foreground">Amount paid</p><p className="font-heading text-4xl font-bold">${payment.amount.toFixed(2)}</p></div><StatusPill status={payment.status} /></div>
        <dl className="grid gap-5 py-6 text-sm sm:grid-cols-2">
          <div><dt className="text-muted-foreground">Payment ID</dt><dd className="break-all font-mono text-xs">{payment.id}</dd></div>
          <div><dt className="text-muted-foreground">Rental order</dt><dd className="break-all font-mono text-xs">{payment.rentalOrderId}</dd></div>
          <div><dt className="text-muted-foreground">Payment provider</dt><dd className="font-semibold">{payment.provider}</dd></div>
          <div><dt className="text-muted-foreground">Paid at</dt><dd className="font-semibold">{payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "Pending"}</dd></div>
          <div className="sm:col-span-2"><dt className="text-muted-foreground">Checkout session</dt><dd className="break-all font-mono text-xs">{payment.sessionId}</dd></div>
        </dl>
      </div>
    </div>
  )
}

