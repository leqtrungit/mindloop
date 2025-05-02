"use client"

import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Clock, FileText, Tag } from "lucide-react"
import { type Moment } from "@/lib/schema"

interface MomentCardProps {
  moment: Moment
}

export const MomentCard = ({ moment }: MomentCardProps) => {
  const impactColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
  }

  return (
    <Card className="group relative h-full transition-all hover:shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-2 text-lg font-semibold">
            {moment.title}
          </CardTitle>
          <Badge
            className={cn(
              "ml-2 whitespace-nowrap",
              impactColors[moment.impact]
            )}
          >
            {moment.impact}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tooltip>
            <TooltipTrigger>
              <Clock className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{moment.time_of_day || "Không xác định"}</p>
            </TooltipContent>
          </Tooltip>
          <span>{formatDistanceToNow(new Date(moment.created_at), { addSuffix: true, locale: vi })}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {moment.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {moment.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {moment.source && (
            <Tooltip>
              <TooltipTrigger>
                <FileText className="h-3 w-3" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Nguồn: {moment.source}</p>
              </TooltipContent>
            </Tooltip>
          )}
          {moment.type && <span>• {moment.type}</span>}
        </div>
      </CardContent>
    </Card>
  )
} 