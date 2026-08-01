import RegisterForm from "../_components/registerform"

const RegisterPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Join the community</p>
          <h1 className="font-heading text-3xl font-bold">Create your GearUp account</h1>
          <p className="text-muted-foreground">Choose how you want to use the rental marketplace.</p>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}

export default RegisterPage
