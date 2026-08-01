"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function GearSearchForm({
  defaults,
}: {
  defaults: Record<string, string | undefined>
}) {
  const router = useRouter()

  return (
    <form className="grid gap-3 rounded-xl border bg-card p-4 shadow-sm md:grid-cols-6">
      <div className="relative md:col-span-2">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-10 rounded-md pl-9 text-sm"
          name="searchTerm"
          defaultValue={defaults.searchTerm}
          placeholder="Search gear..."
        />
      </div>
      <select name="condition" defaultValue={defaults.condition ?? ""} className="h-10 rounded-md border bg-background px-3 text-sm">
        <option value="">Any condition</option>
        <option value="NEW">New</option>
        <option value="EXCELLENT">Excellent</option>
        <option value="GOOD">Good</option>
        <option value="FAIR">Fair</option>
        <option value="POOR">Poor</option>
      </select>
      <Input className="h-10 rounded-md text-sm" type="number" min="0" step="0.01" name="minPrice" defaultValue={defaults.minPrice} placeholder="Min price" />
      <Input className="h-10 rounded-md text-sm" type="number" min="0" step="0.01" name="maxPrice" defaultValue={defaults.maxPrice} placeholder="Max price" />
      <select name="sortBy" defaultValue={defaults.sortBy ?? "pricePerDay"} className="h-10 rounded-md border bg-background px-3 text-sm">
        <option value="pricePerDay">Price</option>
        <option value="name">Name</option>
        <option value="createdAt">Newest</option>
      </select>
      <input type="hidden" name="sortOrder" value={defaults.sortOrder ?? "asc"} />
      <div className="flex gap-2 md:col-span-6 md:justify-end">
        <Button type="button" variant="ghost" className="h-10 rounded-md" onClick={() => router.push("/gear")}>
          <RotateCcw />
          Reset
        </Button>
        <Button className="h-10 rounded-md" type="submit">
          <Search />
          Apply filters
        </Button>
      </div>
    </form>
  )
}

