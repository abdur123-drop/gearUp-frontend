import { GearCard } from "@/components/gear/gear-card"
import { Button } from "@/components/ui/button"
import { getCategories, getGear } from "@/services/gear"
import { ChevronLeft, ChevronRight, PackageOpen } from "lucide-react"
import Link from "next/link"
import { GearSearchForm } from "../_components/gear-search-form"

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export const metadata = { title: "Browse gear" }

export default async function GearPage({ searchParams }: { searchParams: SearchParams }) {
  const rawParams = await searchParams
  const value = (key: string) => {
    const item = rawParams[key]
    return Array.isArray(item) ? item[0] : item
  }
  const page = Math.max(1, Number(value("page")) || 1)
  const filters = {
    searchTerm: value("searchTerm"),
    condition: value("condition"),
    minPrice: value("minPrice"),
    maxPrice: value("maxPrice"),
    sortBy: value("sortBy") ?? "pricePerDay",
    sortOrder: value("sortOrder") ?? "asc",
  }

  const [gearResult, categoryResult] = await Promise.all([
    getGear({ ...filters, page, limit: 9, isAvailable: "true" }),
    getCategories(),
  ])
  const categories = categoryResult.data ?? []
  const makePageHref = (nextPage: number) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, item]) => {
      if (item) params.set(key, item)
    })
    params.set("page", String(nextPage))
    return `/gear?${params.toString()}`
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Marketplace</p>
        <h1 className="mt-2 font-heading text-4xl font-bold">Find your next piece of gear</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Search local listings and compare daily rates, condition, and live stock.</p>
      </div>

      <GearSearchForm defaults={filters} />

      {gearResult.data?.length ? (
        <>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{gearResult.meta?.total ?? gearResult.data.length} items found</span>
            <span>Page {gearResult.meta?.page ?? page} of {Math.max(gearResult.meta?.totalPages ?? 1, 1)}</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gearResult.data.map((gear) => (
              <GearCard key={gear.id} gear={gear} category={categories.find((category) => category.id === gear.categoryId)} />
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <Button asChild={page > 1} variant="outline" className="rounded-md" disabled={page <= 1}>
              {page > 1 ? <Link href={makePageHref(page - 1)}><ChevronLeft /> Previous</Link> : <span><ChevronLeft /> Previous</span>}
            </Button>
            <Button
              asChild={page < (gearResult.meta?.totalPages ?? 1)}
              variant="outline"
              className="rounded-md"
              disabled={page >= (gearResult.meta?.totalPages ?? 1)}
            >
              {page < (gearResult.meta?.totalPages ?? 1) ? <Link href={makePageHref(page + 1)}>Next <ChevronRight /></Link> : <span>Next <ChevronRight /></span>}
            </Button>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed p-14 text-center">
          <PackageOpen className="mx-auto mb-3 size-9 text-muted-foreground" />
          <h2 className="font-heading text-xl font-semibold">No gear found</h2>
          <p className="mt-2 text-sm text-muted-foreground">{gearResult.message}</p>
          <Button asChild variant="outline" className="mt-5 rounded-md"><Link href="/gear">Clear filters</Link></Button>
        </div>
      )}
    </div>
  )
}

