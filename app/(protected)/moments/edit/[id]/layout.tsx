import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("form")
  
  return {
    title: t("update") + " | MindLoop",
    description: t("description"),
  }
}

export default function EditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 