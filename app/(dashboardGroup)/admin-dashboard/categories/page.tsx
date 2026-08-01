import { Button } from "@/components/ui/button"
import { getCategories } from "@/services/gear"
import { deleteCategoryAction } from "../../_actions/dashboardActions"
import { CategoryForm } from "../../_components/category-form"

export const metadata = { title: "Manage categories" }

export default async function AdminCategoriesPage() {
  const result = await getCategories()
  const categories = result.data ?? []

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Administration</p><h1 className="font-heading text-3xl font-bold">Categories</h1><p className="mt-1 text-sm text-muted-foreground">Create and maintain the taxonomy used by gear listings.</p></div>
      <div className="max-w-2xl"><CategoryForm /></div>
      <div className="grid gap-4 lg:grid-cols-2">
        {categories.map((category) => (
          <article key={category.id} className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-lg font-semibold">{category.name}</h2>
            <p className="mt-1 min-h-10 text-sm text-muted-foreground">{category.description || "No description provided."}</p>
            <p className="mt-3 break-all font-mono text-[11px] text-muted-foreground">{category.id}</p>
            <details className="mt-4"><summary className="cursor-pointer text-sm font-semibold text-primary">Edit category</summary><div className="mt-3"><CategoryForm category={category} /></div></details>
            <form className="mt-4 border-t pt-4" action={deleteCategoryAction.bind(null, category.id)}><Button variant="destructive" size="sm" className="rounded-md">Delete category</Button></form>
          </article>
        ))}
      </div>
      {!categories.length && <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">{result.message}</div>}
    </div>
  )
}

