import { Button } from "@/components/ui/button"
import { getAdminUsers } from "@/services/dashboard"
import { updateUserStatusAction } from "../../_actions/dashboardActions"
import { StatusPill } from "../../_components/status-pill"

export const metadata = { title: "Manage users" }

export default async function AdminUsersPage() {
  const result = await getAdminUsers()
  const users = result.data ?? []

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div><p className="text-sm text-muted-foreground">Administration</p><h1 className="font-heading text-3xl font-bold">Users</h1><p className="mt-1 text-sm text-muted-foreground">Review customer and provider accounts or change access status.</p></div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-4">User</th><th className="px-5 py-4">Role</th><th className="px-5 py-4">Joined</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
            <tbody className="divide-y">
              {users.map((user) => {
                const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
                return (
                  <tr key={user.id} className="hover:bg-muted/20">
                    <td className="px-5 py-4"><p className="font-semibold">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></td>
                    <td className="px-5 py-4">{user.role}</td>
                    <td className="px-5 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4"><StatusPill status={user.status} /></td>
                    <td className="px-5 py-4 text-right"><form action={updateUserStatusAction.bind(null, user.id, nextStatus)}><Button size="sm" variant={nextStatus === "SUSPENDED" ? "destructive" : "outline"} className="rounded-md">{nextStatus === "SUSPENDED" ? "Suspend" : "Activate"}</Button></form></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {!users.length && <div className="p-10 text-center text-sm text-muted-foreground">{result.message}</div>}
      </div>
    </div>
  )
}

