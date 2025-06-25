import { MomentsGrid } from "@/components/moments/moments-grid"
import { SearchInput } from "@/components/moments/search-input"
import { MomentsSkeleton } from "@/components/moments/moments-skeleton"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"
import { type Moment } from "@/utils/supabase/supabase"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("moments")
  
  return {
    title: t("title") + " | MindLoop",
    description: t("description"),
  }
}

interface SearchParams {
  search?: string
}

interface ReadMomentsPageProps {
  searchParams: Promise<SearchParams>
}

async function MomentsContent({ searchQuery }: { searchQuery?: string }) {
  const t = await getTranslations("moments")
  const supabase = await createClient()

  let query = supabase
    .from("moments")
    .select("*")
    .order("created_at", { ascending: false })

  // Thêm tìm kiếm toàn văn nếu có search query
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim()
    
    // Tìm kiếm trong title và description với ilike
    // Và tìm kiếm trong tags array bằng cách convert array thành text
    query = query.or(
      `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`
    )
  }

  const { data: moments, error } = await query

  if (error) {
    console.error("Error fetching moments:", error)
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-destructive">{t("error.title")}</h2>
        <p className="text-muted-foreground mt-2">
          {t("error.description")}
        </p>
      </div>
    )
  }

  // Nếu search bằng Supabase không hoạt động tốt với tags, 
  // ta có thể filter thêm ở phía client
  let filteredMoments = moments || []
  
  if (searchQuery && searchQuery.trim() && filteredMoments.length === 0 && moments) {
    // Fallback: filter ở client side nếu server-side search không tìm thấy
    const searchTermLower = searchQuery.trim().toLowerCase()
    filteredMoments = moments.filter(moment => 
      moment.title.toLowerCase().includes(searchTermLower) ||
      moment.description?.toLowerCase().includes(searchTermLower) ||
      moment.tags?.some((tag: string) => tag.toLowerCase().includes(searchTermLower))
    )
  }

  if (!filteredMoments || filteredMoments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">
          {searchQuery ? t("noSearchResults") : t("emptyState")}
        </p>
      </div>
    )
  }

  return <MomentsGrid moments={filteredMoments as Moment[]} />
}

export default async function ReadMomentsPage({ searchParams }: ReadMomentsPageProps) {
  const t = await getTranslations("moments")
  const resolvedSearchParams = await searchParams
  const searchQuery = resolvedSearchParams.search

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-6 sm:pt-6">
      {/* Header với search và nút tạo mới */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-between sm:items-center mb-4 sm:mb-6">
        {/* Search input - full width trên mobile, limited width trên desktop */}
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
          <SearchInput />
        </div>
        
        {/* Create button - ẩn trên mobile, hiển thị trên desktop */}
        <div className="hidden sm:block">
          <Button asChild className="flex-shrink-0">
            <Link href="/moments/new" className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              {t("createButton")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Kết quả tìm kiếm */}
      {searchQuery && (
        <div className="mb-3 sm:mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {t("searchResults")} <span className="font-medium">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {/* Danh sách moments */}
      <div className="sm:pb-4">
        <Suspense fallback={<MomentsSkeleton />}>
          <MomentsContent key={searchQuery || "all"} searchQuery={searchQuery} />
        </Suspense>
      </div>
    </div>
  )
} 