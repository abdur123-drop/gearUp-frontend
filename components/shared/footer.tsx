import { Mountain } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-heading text-lg font-bold">
            <Mountain className="size-5 text-primary" />
            GearUp
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A community marketplace for dependable outdoor gear, flexible rentals, and more adventures.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Explore</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link href="/gear">Browse gear</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/about">About GearUp</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Get started</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link href="/register">Create an account</Link>
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GearUp. Built for the outdoors.
      </div>
    </footer>
  )
}
