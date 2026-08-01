import { Card, CardContent } from "@/components/ui/card"
import type { Category, GearItem } from "@/lib/types"
import { ArrowRight, PackageCheck } from "lucide-react"
import Link from "next/link"
import { GearVisual } from "../shared/gear-visual"

export function GearCard({
  gear,
  category,
}: {
  gear: GearItem
  category?: Category
}) {
  return (
    <Link href={`/gear/${gear.id}`} className="group">
      <Card className="h-full gap-0 overflow-hidden rounded-xl border-0 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg">
        <GearVisual name={gear.name} />
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              {category?.name ?? gear.condition}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <PackageCheck className="size-3.5" />
              {gear.availableStock} available
            </span>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold group-hover:text-primary">{gear.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{gear.description}</p>
          </div>
          <div className="flex items-end justify-between border-t pt-3">
            <p>
              <span className="text-xl font-bold">${gear.pricePerDay.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground"> / day</span>
            </p>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

