export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "COMPLETED" || status === "RETURNED" || status === "ACTIVE" || status === "PAID"
      ? "bg-emerald-500/10 text-emerald-700"
      : status === "FAILED" || status === "CANCELLED" || status === "SUSPENDED"
        ? "bg-destructive/10 text-destructive"
        : status === "PICKED_UP" || status === "CONFIRMED"
          ? "bg-sky-500/10 text-sky-700"
          : "bg-amber-500/10 text-amber-700"

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>{status.replaceAll("_", " ")}</span>
}

