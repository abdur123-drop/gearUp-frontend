"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="font-heading text-3xl font-bold">Something went off trail</h1>
        <p className="text-muted-foreground">
          We could not load this page. Check that the GearUp API is available and try again.
        </p>
        <Button className="rounded-md" onClick={reset}>Try again</Button>
      </div>
    </main>
  )
}
