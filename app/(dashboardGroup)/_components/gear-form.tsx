"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ActionState, Category, GearItem } from "@/lib/types"
import { useActionState } from "react"
import { createGearAction, updateGearAction } from "../_actions/dashboardActions"

const initialState: ActionState = { success: false, message: "" }

export function GearForm({
  categories,
  gear,
}: {
  categories: Category[]
  gear?: GearItem
}) {
  const action = gear ? updateGearAction.bind(null, gear.id) : createGearAction
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="space-y-4 rounded-xl border bg-card p-5 shadow-sm">
      <div>
        <h2 className="font-heading text-lg font-semibold">{gear ? `Edit ${gear.name}` : "List new gear"}</h2>
        <p className="text-xs text-muted-foreground">{gear ? "Update pricing, stock, and listing details." : "Add equipment to the public marketplace."}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Gear name"><Input className="h-10 rounded-md text-sm" name="name" defaultValue={gear?.name} minLength={2} required /></Field>
        <Field label="Brand (optional)"><Input className="h-10 rounded-md text-sm" name="brand" defaultValue={gear?.brand ?? ""} /></Field>
        <Field label="Price per day"><Input className="h-10 rounded-md text-sm" type="number" name="pricePerDay" defaultValue={gear?.pricePerDay} min="0.01" step="0.01" required /></Field>
        <Field label="Total stock"><Input className="h-10 rounded-md text-sm" type="number" name="stock" defaultValue={gear?.stock} min="1" step="1" required /></Field>
        {gear && <Field label="Available stock"><Input className="h-10 rounded-md text-sm" type="number" name="availableStock" defaultValue={gear.availableStock} min="0" max={gear.stock} step="1" required /></Field>}
        <Field label="Condition">
          <select name="condition" defaultValue={gear?.condition ?? "GOOD"} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
            <option value="NEW">New</option><option value="EXCELLENT">Excellent</option><option value="GOOD">Good</option><option value="FAIR">Fair</option><option value="POOR">Poor</option>
          </select>
        </Field>
        <Field label="Category">
          <select name="categoryId" defaultValue={gear?.categoryId ?? ""} className="h-10 w-full rounded-md border bg-background px-3 text-sm" required>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Description">
        <textarea name="description" defaultValue={gear?.description} minLength={10} required className="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm" />
      </Field>
      {state.message && <p className={`rounded-md px-3 py-2 text-sm ${state.success ? "bg-emerald-500/10 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>{state.message}</p>}
      <Button className="rounded-md" disabled={pending}>{pending ? "Saving..." : gear ? "Save changes" : "Create listing"}</Button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1.5 text-xs font-medium">{label}{children}</label>
}

