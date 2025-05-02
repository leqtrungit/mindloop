import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <div className="flex-1 w-full pt-16 pb-16 md:pb-0">
      {children}
      <MobileNav />
    </div>
  )
} 