import { Navbar } from "@/components/shared/navbar"
import { getMe } from "@/services/getMe"

const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const result = await getMe()
  return (
    <div className="min-h-screen">
      <Navbar user={result.success ? result.data : undefined} />
      {children}
    </div>
  )
}

export default AuthLayout
