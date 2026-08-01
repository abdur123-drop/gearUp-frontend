import "server-only"

import type { Category, GearItem } from "@/lib/types"
import { apiRequest } from "./api"

export async function getCategories() {
  return apiRequest<Category[]>("/api/categories")
}

export async function getGear(
  params: Record<string, string | number | undefined> = {},
) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value))
  }
  const suffix = query.size ? `?${query.toString()}` : ""
  return apiRequest<GearItem[]>(`/api/gear${suffix}`)
}

export async function getGearItem(id: string) {
  return apiRequest<GearItem>(`/api/gear/${id}`)
}

