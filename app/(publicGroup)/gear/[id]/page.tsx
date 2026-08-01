import { GearVisual } from "@/components/shared/gear-visual"
import { getMe } from "@/services/getMe"
import { getCategories, getGearItem } from "@/services/gear"
import { Boxes, CheckCircle2, PackageCheck, ShieldCheck, UserRound } from "lucide-react"
import { notFound } from "next/navigation"
import { RentalForm } from "../../_components/rental-form"

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [gearResult, categoryResult, userResult] = await Promise.all([
    getGearItem(id),
    getCategories(),
    getMe(),
  ])

  if (!gearResult.success || !gearResult.data) notFound()
  const gear = gearResult.data
  const category = categoryResult.data?.find((item) => item.id === gear.categoryId)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-8">
          <GearVisual name={gear.name} className="h-80 rounded-2xl border sm:h-[28rem]" />
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{category?.name ?? "Outdoor gear"}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{gear.condition}</span>
              {gear.isAvailable && <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700"><CheckCircle2 className="size-3.5" /> Available</span>}
            </div>
            <div>
              <h1 className="font-heading text-4xl font-bold">{gear.name}</h1>
              {gear.brand && <p className="mt-2 text-sm text-muted-foreground">By {gear.brand}</p>}
            </div>
            <p className="text-base leading-7 text-muted-foreground">{gear.description}</p>
            <div className="grid gap-4 border-y py-6 sm:grid-cols-3">
              <div className="flex items-center gap-3"><Boxes className="size-5 text-primary" /><div><p className="text-xs text-muted-foreground">Total stock</p><p className="font-semibold">{gear.stock}</p></div></div>
              <div className="flex items-center gap-3"><PackageCheck className="size-5 text-primary" /><div><p className="text-xs text-muted-foreground">Available now</p><p className="font-semibold">{gear.availableStock}</p></div></div>
              <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-primary" /><div><p className="text-xs text-muted-foreground">Condition</p><p className="font-semibold">{gear.condition}</p></div></div>
            </div>
            {gear.provider && (
              <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-5">
                <div className="grid size-11 place-items-center rounded-full bg-primary/10"><UserRound className="size-5 text-primary" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Listed by</p>
                  <p className="font-semibold">{gear.provider.name}</p>
                  <p className="text-xs text-muted-foreground">{gear.provider.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-lg lg:sticky lg:top-24">
          <div className="mb-6 border-b pb-5">
            <span className="font-heading text-3xl font-bold">${gear.pricePerDay.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground"> / day</span>
          </div>
          <RentalForm
            gearId={gear.id}
            availableStock={gear.availableStock}
            signedIn={Boolean(userResult.success)}
            isCustomer={userResult.data?.role === "CUSTOMER"}
          />
          <p className="mt-4 text-center text-xs text-muted-foreground">The total is calculated from quantity × rental days.</p>
        </aside>
      </div>
    </div>
  )
}

