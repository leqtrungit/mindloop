import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("form")
  
  return {
    title: t("title") + " | MindLoop",
    description: t("description"),
  }
}

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 