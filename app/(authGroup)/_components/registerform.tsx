"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { ActionState } from "@/lib/types"
import Link from "next/link"
import { useActionState } from "react"
import { registerAction } from "../_actions/authAction"

const initialState: ActionState = { success: false, message: "" }

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, initialState)

  return (
    <form action={action}>
      <Card className="gap-4 rounded-xl p-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Full name</label>
          <Input className="h-10 rounded-md text-sm" id="name" name="name" placeholder="Your name" minLength={2} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input className="h-10 rounded-md text-sm" id="email" type="email" name="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Input className="h-10 rounded-md text-sm" id="password" type="password" name="password" placeholder="At least 6 characters" minLength={6} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">I want to</label>
          <select
            id="role"
            name="role"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            defaultValue="CUSTOMER"
          >
            <option value="CUSTOMER">Rent outdoor gear</option>
            <option value="PROVIDER">List gear for rent</option>
          </select>
        </div>
        {state.message && (
          <p className={`rounded-md px-3 py-2 text-sm ${state.success ? "bg-emerald-500/10 text-emerald-700" : "bg-destructive/10 text-destructive"}`} role="status">
            {state.message}
          </p>
        )}
        <Button className="h-10 rounded-md text-sm" type="submit" disabled={pending}>
          {pending ? "Creating account..." : "Create account"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link className="font-medium text-primary hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </form>
  )
}

export default RegisterForm
