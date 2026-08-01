"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ActionState, Category } from "@/lib/types"
import { useActionState } from "react"
import { createCategoryAction, updateCategoryAction } from "../_actions/dashboardActions"

const initialState: ActionState = { success: false, message: "" }

export function CategoryForm({ category }: { category?: Category }) {
  const action = category ? updateCategoryAction.bind(null, category.id) : createCategoryAction
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="grid gap-3 rounded-xl border bg-card p-5 shadow-sm">
      <div><h2 className="font-heading text-lg font-semibold">{category ? `Edit ${category.name}` : "Create category"}</h2><p className="text-xs text-muted-foreground">Categories organize provider listings.</p></div>
      <label className="grid gap-1.5 text-xs font-medium">Name<Input className="h-10 rounded-md text-sm" name="name" defaultValue={category?.name} minLength={2} required /></label>
      <label className="grid gap-1.5 text-xs font-medium">Description<textarea className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm" name="description" defaultValue={category?.description ?? ""} minLength={10} /></label>
      {state.message && <p className={`rounded-md px-3 py-2 text-sm ${state.success ? "bg-emerald-500/10 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>{state.message}</p>}
      <Button className="w-fit rounded-md" disabled={pending}>{pending ? "Saving..." : category ? "Save changes" : "Create category"}</Button>
    </form>
  )
}

