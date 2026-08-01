import { Bike, Camera, Mountain, Tent, type LucideIcon } from "lucide-react"

const visuals: { pattern: RegExp; icon: LucideIcon; gradient: string }[] = [
  { pattern: /camera|photo|lens/i, icon: Camera, gradient: "from-sky-500/25 via-cyan-500/15 to-background" },
  { pattern: /bike|cycle/i, icon: Bike, gradient: "from-emerald-500/25 via-lime-500/15 to-background" },
  { pattern: /tent|camp|sleep/i, icon: Tent, gradient: "from-orange-500/25 via-amber-500/15 to-background" },
]

export function GearVisual({
  name,
  className = "h-44",
}: {
  name: string
  className?: string
}) {
  const visual =
    visuals.find(({ pattern }) => pattern.test(name)) ??
    { icon: Mountain, gradient: "from-primary/25 via-amber-500/10 to-background" }
  const Icon = visual.icon

  return (
    <div className={`grid place-items-center bg-gradient-to-br ${visual.gradient} ${className}`}>
      <div className="grid size-20 place-items-center rounded-full border border-white/50 bg-background/70 shadow-sm backdrop-blur">
        <Icon className="size-9 text-primary" strokeWidth={1.6} />
      </div>
    </div>
  )
}

