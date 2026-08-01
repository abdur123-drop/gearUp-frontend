import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div className="space-y-4">
        <Compass className="mx-auto size-12 text-primary" />
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="font-heading text-4xl font-bold">This trail goes nowhere</h1>
        <p className="text-muted-foreground">The page you requested could not be found.</p>
        <Button asChild className="rounded-md"><Link href="/">Return home</Link></Button>
      </div>
    </main>
  )
}
