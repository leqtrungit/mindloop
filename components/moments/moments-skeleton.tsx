import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const MomentsSkeleton = () => {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="space-y-2 pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <div className="h-4 sm:h-5 bg-muted rounded w-3/4"></div>
              <div className="h-5 sm:h-6 bg-muted rounded w-12 sm:w-16"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 sm:h-4 bg-muted rounded w-20 sm:w-24"></div>
              <div className="flex gap-1">
                <div className="h-6 sm:h-8 bg-muted rounded w-6 sm:w-16"></div>
                <div className="h-6 sm:h-8 bg-muted rounded w-6 sm:w-16"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 pt-0">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
              <div className="h-4 bg-muted rounded w-3/5"></div>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div className="h-5 sm:h-6 bg-muted rounded w-12 sm:w-16"></div>
              <div className="h-5 sm:h-6 bg-muted rounded w-16 sm:w-20"></div>
              <div className="h-5 sm:h-6 bg-muted rounded w-10 sm:w-14"></div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-3 sm:h-4 bg-muted rounded w-16 sm:w-20"></div>
              <div className="h-3 sm:h-4 bg-muted rounded w-18 sm:w-24"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 