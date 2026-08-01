export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 px-4 py-10">
      <div className="h-8 w-64 rounded bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-64 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  )
}
