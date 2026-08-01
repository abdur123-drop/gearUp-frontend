"use server"

import type { ActionState, Role } from "@/lib/types"
import { apiRequest } from "@/services/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginResult = { accessToken: string }

function dashboardForRole(role?: Role) {
  if (role === "ADMIN") return "/admin-dashboard"
  if (role === "PROVIDER") return "/provider-dashboard"
  return "/dashboard"
}

function readTokenRole(token: string): Role | undefined {
  try {
    const payload = token.split(".")[1]
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { data?: { role?: Role }; role?: Role }
    return decoded.data?.role ?? decoded.role
  } catch {
    return undefined
  }
}

export async function loginAction(
  redirectTo: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || password.length < 6) {
    return {
      success: false,
      message: "Enter a valid email and a password of at least 6 characters.",
    }
  }

  const result = await apiRequest<LoginResult>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  })

  if (!result.success || !result.data?.accessToken) {
    return { success: false, message: result.message || "Login failed." }
  }

  const cookieStore = await cookies()
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  if (
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//") &&
    !redirectTo.startsWith("/login") &&
    !redirectTo.startsWith("/register")
  ) {
    redirect(redirectTo)
  }

  redirect(dashboardForRole(readTokenRole(result.data.accessToken)))
}

export async function registerAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const role = String(formData.get("role") ?? "") as Role

  if (name.length < 2) {
    return { success: false, message: "Name must be at least 2 characters." }
  }
  if (!email.includes("@") || password.length < 6) {
    return {
      success: false,
      message: "Use a valid email and a password of at least 6 characters.",
    }
  }
  if (role !== "CUSTOMER" && role !== "PROVIDER") {
    return { success: false, message: "Choose customer or provider." }
  }

  const result = await apiRequest<unknown>("/api/auth/register", {
    method: "POST",
    body: { name, email, password, role },
  })

  if (!result.success) {
    return { success: false, message: result.message || "Registration failed." }
  }

  return {
    success: true,
    message: "Account created. You can now sign in.",
  }
}
