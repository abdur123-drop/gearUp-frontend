import { Button } from "@/components/ui/button"
import { deleteGearAction } from "../../_actions/dashboardActions"
import { GearForm } from "../../_components/gear-form"
import { StatusPill } from "../../_components/status-pill"
import { getProviderGear } from "@/services/dashboard"
import { getMe } from "@/services/getMe"
import { getCategories } from "@/services/gear"
import Link from "next/link"

export const metadata = { title: "Manage gear" }

export default async function ProviderGearPage() {
  const [userResult, categoryResult] = await Promise.all([getMe(), getCategories()])
  const result = userResult.data ? await getProviderGear(userResult.data.id) : { data: [] }
  const gear = result.data ?? []
  const categories = categoryResult.data ?? []

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Provider</p><h1 className="font-heading text-3xl font-bold">My gear</h1><p className="mt-1 text-sm text-muted-foreground">Keep stock and listing information accurate for customers.</p></div>
      <GearForm categories={categories} />
      <section className="space-y-4">
        <div><h2 className="font-heading text-xl font-semibold">Your listings</h2><p className="text-sm text-muted-foreground">{gear.length} listing{gear.length === 1 ? "" : "s"}</p></div>
        <div className="grid gap-5">
          {gear.map((item) => (
            <article key={item.id} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div><div className="mb-2 flex gap-2"><StatusPill status={item.isAvailable ? "ACTIVE" : "SUSPENDED"} /><StatusPill status={item.condition} /></div><h3 className="font-heading text-xl font-semibold">{item.name}</h3><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p></div>
                <div className="shrink-0 text-left sm:text-right"><p className="text-xl font-bold">${item.pricePerDay.toFixed(2)}<span className="text-xs font-normal text-muted-foreground">/day</span></p><p className="text-xs text-muted-foreground">{item.availableStock} of {item.stock} available</p></div>
              </div>
              <details className="mt-5">
                <summary className="cursor-pointer text-sm font-semibold text-primary">Edit listing</summary>
                <div className="mt-4"><GearForm categories={categories} gear={item} /></div>
              </details>
              <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                <Button asChild variant="outline" className="rounded-md"><Link href={`/gear/${item.id}`}>View public page</Link></Button>
                <form action={deleteGearAction.bind(null, item.id)}><Button variant="destructive" className="rounded-md">Delete listing</Button></form>
              </div>
            </article>
          ))}
          {!gear.length && <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">You have not listed any gear yet.</div>}
        </div>
      </section>
    </div>
  )
}

