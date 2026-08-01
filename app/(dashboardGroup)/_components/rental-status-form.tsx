"use client"

import { Button } from "@/components/ui/button"
import type { ActionState, OrderStatus } from "@/lib/types"
import { useActionState } from "react"
import { updateRentalStatusAction } from "../_actions/dashboardActions"

const initialState: ActionState = { success: false, message: "" }

export function RentalStatusForm({
  rentalId,
  currentStatus,
}: {
  rentalId: string
  currentStatus: OrderStatus
}) {
  const [state, action, pending] = useActionState(
    updateRentalStatusAction.bind(null, rentalId),
    initialState,
  )

  return (
    <form action={action} className="space-y-3 rounded-lg border bg-muted/20 p-4">
      <label htmlFor="rental-order-status" className="text-sm font-semibold">Update rental status</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <select id="rental-order-status" name="rentalOrderStatus" defaultValue={currentStatus} className="h-10 flex-1 rounded-md border bg-background px-3 text-sm">
          <option value="PLACED">Placed</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PICKED_UP">Picked up</option>
          <option value="RETURNED">Returned</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="PAID">Paid</option>
        </select>
        <Button className="h-10 rounded-md" disabled={pending}>{pending ? "Updating..." : "Update status"}</Button>
      </div>
      {state.message && <p role="status" aria-live="polite" className={`text-xs ${state.success ? "text-emerald-700" : "text-destructive"}`}>{state.message}</p>}
    </form>
  )
}
