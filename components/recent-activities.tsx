import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

const activities = [
  { id: 1, description: "New tenant added to 123 Main St", timestamp: "2 hours ago" },
  { id: 2, description: "Maintenance request resolved at 456 Elm St", timestamp: "4 hours ago" },
  { id: 3, description: "Rent payment received from John Doe", timestamp: "1 day ago" },
  { id: 4, description: "Lease renewed for 789 Oak St", timestamp: "2 days ago" },
]

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px]">
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="group">
                <Link 
                  href={`/activities/${activity.id}`} 
                  className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md transition-colors"
                >
                  <span className="text-sm truncate mr-2">{activity.description}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

