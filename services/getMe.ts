import "server-only"

import type { User } from "@/lib/types"
import { cache } from "react"
import { apiRequest } from "./api"

export const getMe = cache(async function getCurrentUser() {
  return apiRequest<User>("/api/auth/me", { authenticated: true })
})
