import "server-only"

import { cookies } from "next/headers"
import type { ApiResponse } from "@/lib/types"

export const BACKEND_URL =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://assaignment-4-level-2.vercel.app"

const API_TIMEOUT_MS = Number(process.env.API_TIMEOUT_MS ?? 8000)

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown
  authenticated?: boolean
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { body, authenticated = false, headers, ...requestOptions } = options
  const requestHeaders = new Headers(headers)

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json")
  }

  if (authenticated) {
    const token = (await cookies()).get("accessToken")?.value
    if (!token) {
      return { success: false, message: "Please sign in to continue." }
    }
    requestHeaders.set("Authorization", `Bearer ${token}`)
  }

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      ...requestOptions,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: requestOptions.cache ?? "no-store",
      signal: requestOptions.signal ?? AbortSignal.timeout(API_TIMEOUT_MS),
    })

    const result = (await response.json()) as ApiResponse<T>
    return {
      ...result,
      success: Boolean(result.success && response.ok),
      message:
        result.message ||
        (response.ok ? "Request completed successfully." : "Request failed."),
    }
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError"
    return {
      success: false,
      message: timedOut
        ? "The GearUp API took too long to respond. Please try again."
        : "Could not reach the GearUp API. Make sure the backend is running and BACKEND_URL is configured.",
    }
  }
}
