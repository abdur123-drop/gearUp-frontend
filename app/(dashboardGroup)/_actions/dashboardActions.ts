"use server"

import type {
  ActionState,
  Category,
  GearCondition,
  GearItem,
  OrderStatus,
  Payment,
  RentalOrder,
  Review,
  User,
  UserStatus,
} from "@/lib/types"
import { apiRequest } from "@/services/api"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const conditions: GearCondition[] = ["NEW", "EXCELLENT", "GOOD", "FAIR", "POOR"]
const orderStatuses: OrderStatus[] = ["PLACED", "CONFIRMED", "PICKED_UP", "RETURNED", "CANCELLED", "PAID"]

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

export async function createGearAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const stock = Number(formData.get("stock"))
  const payload = {
    name: stringValue(formData, "name"),
    description: stringValue(formData, "description"),
    brand: stringValue(formData, "brand") || undefined,
    pricePerDay: Number(formData.get("pricePerDay")),
    stock,
    availableStock: stock,
    condition: stringValue(formData, "condition") as GearCondition,
    categoryId: stringValue(formData, "categoryId"),
  }

  if (payload.name.length < 2 || payload.description.length < 10) {
    return { success: false, message: "Use a name of 2+ characters and a description of 10+ characters." }
  }
  if (!conditions.includes(payload.condition) || payload.pricePerDay <= 0 || !Number.isInteger(stock) || stock <= 0 || !payload.categoryId) {
    return { success: false, message: "Enter a valid price, stock, condition, and category." }
  }

  const result = await apiRequest<GearItem>("/api/gear", {
    method: "POST",
    authenticated: true,
    body: payload,
  })
  if (result.success) {
    revalidatePath("/provider-dashboard")
    revalidatePath("/provider-dashboard/gear")
    revalidatePath("/gear")
  }
  return { success: result.success, message: result.message }
}

export async function updateGearAction(
  gearId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    name: stringValue(formData, "name"),
    description: stringValue(formData, "description"),
    brand: stringValue(formData, "brand") || undefined,
    pricePerDay: Number(formData.get("pricePerDay")),
    stock: Number(formData.get("stock")),
    availableStock: Number(formData.get("availableStock")),
    condition: stringValue(formData, "condition") as GearCondition,
    categoryId: stringValue(formData, "categoryId"),
  }
  const result = await apiRequest<GearItem>(`/api/gear/${gearId}`, {
    method: "PATCH",
    authenticated: true,
    body: payload,
  })
  if (result.success) {
    revalidatePath("/provider-dashboard")
    revalidatePath("/provider-dashboard/gear")
    revalidatePath(`/gear/${gearId}`)
  }
  return { success: result.success, message: result.message }
}

export async function deleteGearAction(gearId: string) {
  await apiRequest<null>(`/api/gear/${gearId}`, {
    method: "DELETE",
    authenticated: true,
  })
  revalidatePath("/provider-dashboard")
  revalidatePath("/provider-dashboard/gear")
  revalidatePath("/gear")
}

export async function createCategoryAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = stringValue(formData, "name")
  const description = stringValue(formData, "description")
  if (name.length < 2 || (description && description.length < 10)) {
    return { success: false, message: "Name must be 2+ characters and description 10+ characters." }
  }
  const result = await apiRequest<Category>("/api/categories", {
    method: "POST",
    authenticated: true,
    body: { name, description: description || undefined },
  })
  if (result.success) revalidatePath("/admin-dashboard/categories")
  return { success: result.success, message: result.message }
}

export async function updateCategoryAction(
  categoryId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = stringValue(formData, "name")
  const description = stringValue(formData, "description")
  const result = await apiRequest<Category>(`/api/categories/${categoryId}`, {
    method: "PATCH",
    authenticated: true,
    body: { name, description: description || undefined },
  })
  if (result.success) revalidatePath("/admin-dashboard/categories")
  return { success: result.success, message: result.message }
}

export async function deleteCategoryAction(categoryId: string) {
  await apiRequest<null>(`/api/categories/${categoryId}`, {
    method: "DELETE",
    authenticated: true,
  })
  revalidatePath("/admin-dashboard/categories")
}

export async function updateUserStatusAction(userId: string, status: UserStatus) {
  await apiRequest<User>(`/api/admin/users/${userId}`, {
    method: "PATCH",
    authenticated: true,
    body: { status },
  })
  revalidatePath("/admin-dashboard/users")
}

export async function updateRentalStatusAction(
  rentalId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rentalOrderStatus = stringValue(formData, "rentalOrderStatus") as OrderStatus
  if (!orderStatuses.includes(rentalOrderStatus)) {
    return { success: false, message: "Choose a valid rental status." }
  }
  const result = await apiRequest<RentalOrder>(`/api/rental/status/${rentalId}`, {
    method: "PATCH",
    authenticated: true,
    body: { status: rentalOrderStatus },
  })
  if (result.success) revalidatePath("/provider-dashboard/rentals")
  return { success: result.success, message: result.message }
}

export async function createReviewAction(
  rentalOrderId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rating = Number(formData.get("rating"))
  const comment = stringValue(formData, "comment")
  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || (comment && comment.length < 5)) {
    return { success: false, message: "Choose 1–5 stars and use at least 5 characters for a comment." }
  }
  const result = await apiRequest<Review>("/api/reviews", {
    method: "POST",
    authenticated: true,
    body: { rentalOrderId, rating, comment: comment || undefined },
  })
  if (result.success) revalidatePath("/dashboard/rentals")
  return { success: result.success, message: result.message }
}

type CheckoutResult = {
  paymentDetails: Payment
  paymentUrl: string
  sessionId: string
}

export async function startPaymentAction(
  rentalOrderId: string,
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState
  void _formData
  const result = await apiRequest<CheckoutResult>("/api/payment/create", {
    method: "POST",
    authenticated: true,
    body: { rentalOrderId },
  })
  if (!result.success || !result.data?.paymentUrl || !result.data.sessionId) {
    return { success: false, message: result.message || "Could not start checkout." }
  }

  const cookieStore = await cookies()
  cookieStore.set("pendingPaymentSession", result.data.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  })
  redirect(result.data.paymentUrl)
}

export async function confirmPendingPayment() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("pendingPaymentSession")?.value
  if (!sessionId) {
    return { success: false, message: "No pending checkout session was found." }
  }
  const result = await apiRequest<{ message: string }>("/api/payment/confirm", {
    method: "POST",
    authenticated: true,
    body: { sessionId },
  })
  if (result.success) {
    cookieStore.delete("pendingPaymentSession")
    revalidatePath("/dashboard/rentals")
    revalidatePath("/dashboard/payments")
  }
  return result
}

export async function clearPendingPayment() {
  const cookieStore = await cookies()
  cookieStore.delete("pendingPaymentSession")
}
