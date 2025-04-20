import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import LandingPage from "@/components/landing/landing-page"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return redirect("/form")
  }

  return <LandingPage />
}
