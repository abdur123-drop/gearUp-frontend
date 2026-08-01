"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { ActionState } from "@/lib/types"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { loginAction } from "../_actions/authAction"

export const LoginForm = () =>{
    const redirectTo = useSearchParams().get("redirectTo") ?? ""
    const initialState: ActionState = { success: false, message: "" }
    const [state, action, pending] = useActionState(
      loginAction.bind(null, redirectTo),
      initialState,
    )

    return (
      <form action={action}>
        <Card className="gap-4 rounded-xl p-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input className="h-10 rounded-md text-sm" id="email" type="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input className="h-10 rounded-md text-sm" id="password" type="password" name="password" placeholder="At least 6 characters" minLength={6} required />
          </div>
          {state.message && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {state.message}
            </p>
          )}
          <Button className="h-10 rounded-md text-sm" type="submit" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New to GearUp?{" "}
            <Link className="font-medium text-primary hover:underline" href="/register">
              Create an account
            </Link>
          </p>
        </Card>
      </form>
    )
}
