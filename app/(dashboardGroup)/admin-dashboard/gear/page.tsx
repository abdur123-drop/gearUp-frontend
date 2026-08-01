import { getAdminGear } from "@/services/dashboard"
import { getCategories } from "@/services/gear"
import Link from "next/link"
import { StatusPill } from "../../_components/status-pill"

export const metadata = { title: "All gear" }

export default async function AdminGearPage() {
  const [result, categoryResult] = await Promise.all([getAdminGear(), getCategories()])
  const gear = result.data ?? []
  const categories = categoryResult.data ?? []

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Administration</p><h1 className="font-heading text-3xl font-bold">All gear</h1><p className="mt-1 text-sm text-muted-foreground">Read-only inventory visibility across every provider.</p></div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-4">Gear</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Condition</th><th className="px-5 py-4">Stock</th><th className="px-5 py-4">Availability</th><th className="px-5 py-4 text-right">Rate</th></tr></thead>
            <tbody className="divide-y">
              {gear.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-5 py-4"><Link href={`/gear/${item.id}`} className="font-semibold text-primary hover:underline">{item.name}</Link><p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">{item.description}</p></td>
                  <td className="px-5 py-4">{categories.find((category) => category.id === item.categoryId)?.name ?? "—"}</td>
                  <td className="px-5 py-4"><StatusPill status={item.condition} /></td>
                  <td className="px-5 py-4">{item.availableStock} / {item.stock}</td>
                  <td className="px-5 py-4"><StatusPill status={item.isAvailable ? "ACTIVE" : "SUSPENDED"} /></td>
                  <td className="px-5 py-4 text-right font-semibold">${item.pricePerDay.toFixed(2)}/day</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!gear.length && <div className="p-10 text-center text-sm text-muted-foreground">{result.message}</div>}
      </div>
    </div>
  )
}

