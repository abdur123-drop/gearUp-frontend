"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ActionState } from "@/lib/types"
import Link from "next/link"
import { useActionState } from "react"
import { createRentalAction } from "../_actions/rentalActions"

const initialState: ActionState = { success: false, message: "" }

export function RentalForm({
  gearId,
  availableStock,
  signedIn,
  isCustomer,
}: {
  gearId: string
  availableStock: number
  signedIn: boolean
  isCustomer: boolean
}) {
  const [state, action, pending] = useActionState(
    createRentalAction.bind(null, gearId),
    initialState,
  )
  const today = new Date().toISOString().slice(0, 10)

  if (!signedIn) {
    return (
      <Button asChild className="h-11 w-full rounded-md text-sm">
        <Link href={`/login?redirectTo=/gear/${gearId}`}>Sign in to rent</Link>
      </Button>
    )
  }

  if (!isCustomer) {
    return <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">Only customer accounts can place rental orders.</p>
  }

  if (availableStock < 1) {
    return <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">This item is currently out of stock.</p>
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="startDate" className="text-xs font-medium">Start date</label>
          <Input className="h-10 rounded-md text-sm" id="startDate" name="startDate" type="date" min={today} required />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="endDate" className="text-xs font-medium">End date</label>
          <Input className="h-10 rounded-md text-sm" id="endDate" name="endDate" type="date" min={today} required />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="quantity" className="text-xs font-medium">Quantity</label>
        <Input className="h-10 rounded-md text-sm" id="quantity" name="quantity" type="number" min={1} max={availableStock} defaultValue={1} required />
      </div>
      {state.message && (
        <p className={`rounded-md px-3 py-2 text-sm ${state.success ? "bg-emerald-500/10 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>
          {state.message}
          {state.success && (
            <> <Link className="font-semibold underline" href="/dashboard/rentals">View rentals</Link></>
          )}
        </p>
      )}
      <Button className="h-11 w-full rounded-md text-sm" disabled={pending}>
        {pending ? "Placing rental..." : "Reserve this gear"}
      </Button>
    </form>
  )
}

