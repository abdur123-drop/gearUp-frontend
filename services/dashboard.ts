import "server-only"

import type { GearItem, Payment, RentalOrder, User } from "@/lib/types"
import { apiRequest } from "./api"
import { getGear } from "./gear"

export async function getMyRentals() {
  return apiRequest<RentalOrder[]>("/api/rental", { authenticated: true })
}

export async function getRental(id: string) {
  return apiRequest<RentalOrder>(`/api/rental/${id}`, { authenticated: true })
}

export async function getPaymentHistory() {
  return apiRequest<Payment[]>("/api/payment", { authenticated: true })
}

export async function getPaymentDetails(id: string) {
  return apiRequest<Payment>(`/api/payment/${id}`, { authenticated: true })
}

export async function getProviderGear(providerId: string) {
  const result = await getGear({ limit: 100, sortBy: "createdAt", sortOrder: "desc" })
  return {
    ...result,
    data: result.data?.filter((gear) => gear.providerId === providerId),
  }
}

export async function getAdminUsers() {
  return apiRequest<User[]>("/api/admin/users", { authenticated: true })
}

export async function getAdminGear() {
  return apiRequest<GearItem[]>("/api/admin/gear", { authenticated: true })
}

export async function getAdminRentals() {
  return apiRequest<RentalOrder[]>("/api/admin/rentals", { authenticated: true })
}

