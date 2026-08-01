import { Button } from "@/components/ui/button"
import { confirmPendingPayment } from "../../(dashboardGroup)/_actions/dashboardActions"
import { CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default async function PaymentSuccessPage() {
  const result = await confirmPendingPayment()
  const success = result.success

  return (
    <div className="grid min-h-[65vh] place-items-center px-4 py-12 text-center">
      <div className="max-w-lg space-y-4">
        {success ? <CheckCircle2 className="mx-auto size-14 text-emerald-600" /> : <XCircle className="mx-auto size-14 text-destructive" />}
        <h1 className="font-heading text-3xl font-bold">{success ? "Payment confirmed" : "Payment needs attention"}</h1>
        <p className="text-muted-foreground">{result.message}</p>
        <div className="flex justify-center gap-3">
          <Button asChild className="rounded-md"><Link href="/dashboard/rentals">View rentals</Link></Button>
          <Button asChild variant="outline" className="rounded-md"><Link href="/dashboard/payments">Payment history</Link></Button>
        </div>
      </div>
    </div>
  )
}

