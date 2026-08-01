import { Button } from "@/components/ui/button"
import { clearPendingPayment } from "../../(dashboardGroup)/_actions/dashboardActions"
import { CircleX } from "lucide-react"
import Link from "next/link"

export default async function PaymentCancelPage() {
  await clearPendingPayment()
  return (
    <div className="grid min-h-[65vh] place-items-center px-4 py-12 text-center">
      <div className="max-w-lg space-y-4">
        <CircleX className="mx-auto size-14 text-amber-600" />
        <h1 className="font-heading text-3xl font-bold">Checkout cancelled</h1>
        <p className="text-muted-foreground">No payment was confirmed. Your rental is still available in the dashboard if you want to try again.</p>
        <Button asChild className="rounded-md"><Link href="/dashboard/rentals">Return to rentals</Link></Button>
      </div>
    </div>
  )
}
