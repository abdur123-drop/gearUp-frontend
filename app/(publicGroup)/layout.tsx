import { Footer } from "@/components/shared/footer"
import { Navbar } from "@/components/shared/navbar"
import { getMe } from "@/services/getMe"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await getMe()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={result.success ? result.data : undefined} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
