import { LoginForm } from "../_components/loginForm"

const loginPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Welcome back</p>
          <h1 className="font-heading text-3xl font-bold">Sign in to GearUp</h1>
          <p className="text-muted-foreground">Manage rentals, gear, and payments from one place.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

export default loginPage
