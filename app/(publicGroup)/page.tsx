import { GearCard } from "@/components/gear/gear-card"
import { Button } from "@/components/ui/button"
import { getCategories, getGear } from "@/services/gear"
import { ArrowRight, BadgeCheck, CalendarCheck, Search, ShieldCheck, TentTree } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const [gearResult, categoryResult] = await Promise.all([
    getGear({ limit: 6, sortBy: "createdAt", sortOrder: "desc", isAvailable: "true" }),
    getCategories(),
  ])
  const categories = categoryResult.data ?? []

  return (
    <>
      <section className="relative overflow-hidden border-b bg-[radial-gradient(circle_at_top_right,var(--color-primary)/0.14,transparent_40%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <TentTree className="size-4" />
              Adventure more. Own less.
            </div>
            <div className="space-y-4">
              <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl">
                The right gear for your <span className="text-primary">next adventure.</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Rent dependable outdoor equipment from trusted local providers. Flexible dates, simple checkout, no garage required.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6 text-sm">
                <Link href="/gear">Browse gear <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-md px-6 text-sm">
                <Link href="/register">List your gear</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> Secure checkout</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-primary" /> Trusted providers</span>
              <span className="flex items-center gap-1.5"><CalendarCheck className="size-4 text-primary" /> Flexible rentals</span>
            </div>
          </div>
          <div className="relative hidden min-h-96 lg:block">
            <div className="absolute inset-8 rotate-3 rounded-[2rem] bg-primary/15" />
            <div className="absolute inset-0 -rotate-2 rounded-[2rem] border bg-card p-8 shadow-2xl">
              <div className="grid h-full place-items-center rounded-2xl bg-gradient-to-br from-primary/25 via-amber-500/10 to-muted">
                <TentTree className="size-32 text-primary" strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Explore</p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Gear for every kind of trip</h2>
          </div>
          <Button asChild variant="ghost" className="hidden rounded-md sm:inline-flex"><Link href="/gear">View all <ArrowRight /></Link></Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(categories.length ? categories.slice(0, 8) : [
            { id: "camping", name: "Camping", description: "Shelter and sleep systems" },
            { id: "hiking", name: "Hiking", description: "Trail-ready essentials" },
            { id: "cycling", name: "Cycling", description: "Bikes and accessories" },
            { id: "photography", name: "Photography", description: "Capture every moment" },
          ]).map((category, index) => (
            <Link key={category.id} href="/gear" className="group rounded-xl border bg-card p-5 transition hover:border-primary/50 hover:shadow-md">
              <div className="mb-4 grid size-11 place-items-center rounded-lg bg-primary/10 font-heading font-bold text-primary">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="font-heading text-lg font-semibold group-hover:text-primary">{category.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{category.description || "Explore available outdoor gear."}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Fresh finds</p>
              <h2 className="mt-2 font-heading text-3xl font-bold">Recently listed gear</h2>
            </div>
            <Button asChild variant="outline" className="hidden rounded-md sm:inline-flex"><Link href="/gear">Browse marketplace <ArrowRight /></Link></Button>
          </div>
          {gearResult.data?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gearResult.data.map((gear) => (
                <GearCard key={gear.id} gear={gear} category={categories.find((category) => category.id === gear.categoryId)} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed bg-background p-12 text-center">
              <Search className="mx-auto mb-3 size-8 text-muted-foreground" />
              <h3 className="font-heading text-lg font-semibold">Gear listings will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">{gearResult.message}</p>
            </div>
          )}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Simple by design</p>
          <h2 className="mt-2 font-heading text-3xl font-bold">From search to trail in three steps</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["01", "Find your gear", "Search and filter equipment by price, condition, and availability."],
            ["02", "Choose your dates", "Pick a quantity and rental window that works for your adventure."],
            ["03", "Pay and pick up", "Complete secure checkout and track the order from your dashboard."],
          ].map(([number, title, description]) => (
            <div key={number} className="relative rounded-xl border bg-card p-6">
              <span className="font-heading text-4xl font-bold text-primary/20">{number}</span>
              <h3 className="mt-5 font-heading text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
