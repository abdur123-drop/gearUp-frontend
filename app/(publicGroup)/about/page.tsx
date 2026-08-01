import { BadgeCheck, Leaf, Repeat2, Users } from "lucide-react"

export const metadata = { title: "About" }

export default function AboutPage() {
  return (
    <div>
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About GearUp</p>
          <h1 className="mt-3 font-heading text-5xl font-bold">More access. Less waste. Better adventures.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            GearUp connects outdoor enthusiasts with local equipment providers, making quality gear easier to access and more useful throughout its life.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          [Users, "Community powered", "Customers and providers meet in a transparent local marketplace."],
          [BadgeCheck, "Dependable listings", "Clear condition, stock, pricing, and provider information."],
          [Repeat2, "Flexible access", "Rent only what you need, for exactly as long as you need it."],
          [Leaf, "Lighter footprint", "Shared equipment spends more time outside and less time in storage."],
        ].map(([Icon, title, copy]) => {
          const FeatureIcon = Icon as typeof Users
          return (
            <div key={String(title)} className="rounded-xl border p-6">
              <FeatureIcon className="size-7 text-primary" />
              <h2 className="mt-5 font-heading text-lg font-semibold">{String(title)}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{String(copy)}</p>
            </div>
          )
        })}
      </section>
    </div>
  )
}
