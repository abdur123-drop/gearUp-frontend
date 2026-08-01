import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/shared/navbar"
import { getMe } from "@/services/getMe"
import { logOut } from "@/services/logout"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "./_components/dashboard-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = (await cookies()).get("accessToken")?.value
  if (!token) redirect("/login")

  const userResult = await getMe()
  if (!userResult.success || !userResult.data) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/20 px-4 text-center">
        <div className="max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">API unavailable</p>
          <h1 className="mt-3 font-heading text-3xl font-bold">Dashboard could not load</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{userResult.message}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-md"><Link href="">Try again</Link></Button>
            <form action={logOut}><Button variant="outline" className="rounded-md">Sign out</Button></form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar user={userResult.data} />
      <div className="md:flex">
        <DashboardSidebar role={userResult.data.role} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
