import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  icon: React.ElementType
  iconColor?: string
  iconBg?: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-500",
  iconBg = "bg-blue-50",
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
