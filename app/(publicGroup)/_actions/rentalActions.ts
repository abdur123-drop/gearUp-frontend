"use server"

import type { ActionState, RentalOrder } from "@/lib/types"
import { apiRequest } from "@/services/api"
import { revalidatePath } from "next/cache"

export async function createRentalAction(
  gearItemId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const quantity = Number(formData.get("quantity"))
  const startDate = String(formData.get("startDate") ?? "")
  const endDate = String(formData.get("endDate") ?? "")

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { success: false, message: "Quantity must be a positive whole number." }
  }
  if (!startDate || !endDate || new Date(endDate) <= new Date(startDate)) {
    return { success: false, message: "End date must be after the start date." }
  }

  const result = await apiRequest<RentalOrder>("/api/rental", {
    method: "POST",
    authenticated: true,
    body: { gearItemId, quantity, startDate, endDate },
  })

  if (result.success) {
    revalidatePath("/gear")
    revalidatePath(`/gear/${gearItemId}`)
    revalidatePath("/dashboard/rentals")
  }

  return { success: result.success, message: result.message }
}

