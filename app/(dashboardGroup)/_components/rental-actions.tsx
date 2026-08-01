"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ActionState, RentalOrder } from "@/lib/types"
import { CreditCard, Star } from "lucide-react"
import { useActionState } from "react"
import { createReviewAction, startPaymentAction } from "../_actions/dashboardActions"

const initialState: ActionState = { success: false, message: "" }

export function PaymentButton({ rental }: { rental: RentalOrder }) {
  const [state, action, pending] = useActionState(
    startPaymentAction.bind(null, rental.id),
    initialState,
  )

  if (rental.paymentStatus === "COMPLETED") return null
  if (rental.status === "CANCELLED") return null

  return (
    <form action={action} className="space-y-2">
      <Button className="rounded-md" disabled={pending}>
        <CreditCard />
        {pending ? "Opening checkout..." : "Pay now"}
      </Button>
      {!state.success && state.message && <p className="text-xs text-destructive">{state.message}</p>}
    </form>
  )
}

export function ReviewForm({ rentalId }: { rentalId: string }) {
  const [state, action, pending] = useActionState(
    createReviewAction.bind(null, rentalId),
    initialState,
  )

  return (
    <form action={action} className="space-y-3 rounded-lg border bg-muted/20 p-4">
      <div className="flex items-center gap-2">
        <Star className="size-4 fill-amber-400 text-amber-400" />
        <p className="text-sm font-semibold">Review this rental</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-[120px_1fr_auto]">
        <select name="rating" className="h-10 rounded-md border bg-background px-3 text-sm" defaultValue="5">
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
        <Input className="h-10 rounded-md text-sm" name="comment" minLength={5} placeholder="Share your experience (optional)" />
        <Button className="h-10 rounded-md" variant="outline" disabled={pending}>{pending ? "Submitting..." : "Submit review"}</Button>
      </div>
      {state.message && <p className={`text-xs ${state.success ? "text-emerald-700" : "text-destructive"}`}>{state.message}</p>}
    </form>
  )
}

