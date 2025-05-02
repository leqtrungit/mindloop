import { MomentsGrid } from "@/components/moments/moments-grid"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"
import { type Moment } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("moments")
  
  return {
    title: t("title") + " | MindLoop",
    description: t("description"),
  }
}

export default async function ReadMomentsPage() {
  const t = await getTranslations("moments")
  const supabase = await createClient()

  const { data: moments, error } = await supabase
    .from("moments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching moments:", error)
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">{t("error.title")}</h1>
        <p className="text-muted-foreground">
          {t("error.description")}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="hidden md:flex justify-end">
        <Button asChild>
          <Link href="/form" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t("createButton")}
          </Link>
        </Button>
      </div>

      {moments && moments.length > 0 ? (
        <div className="py-4">
          <MomentsGrid moments={moments as Moment[]} />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            {t("emptyState")}
          </p>
        </div>
      )}
    </div>
  )
} 