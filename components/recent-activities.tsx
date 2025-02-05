import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { cn } from "@/lib/utils"

const propertyActivities = {
  "all": [
    { id: 1, description: "New tenant added to 123 Main St", timestamp: "2 hours ago", property: "123-main-st" },
    { id: 2, description: "Maintenance request resolved at 456 Elm St", timestamp: "4 hours ago", property: "456-elm-st" },
    { id: 3, description: "Rent payment received from John Doe", timestamp: "1 day ago", property: "123-main-st" },
    { id: 4, description: "Lease renewed for 789 Oak St", timestamp: "2 days ago", property: "456-elm-st" },
  ],
  "123-main-st": [
    { id: 1, description: "New tenant added to 123 Main St", timestamp: "2 hours ago", property: "123-main-st" },
    { id: 3, description: "Rent payment received from John Doe", timestamp: "1 day ago", property: "123-main-st" },
  ],
  "456-elm-st": [
    { id: 2, description: "Maintenance request resolved at 456 Elm St", timestamp: "4 hours ago", property: "456-elm-st" },
    { id: 4, description: "Lease renewed for 789 Oak St", timestamp: "2 days ago", property: "456-elm-st" },
  ],
}

interface RecentActivitiesProps {
  selectedProperty: string;
  dateRange: { from: Date; to: Date } | undefined;
}

export function RecentActivities({ selectedProperty, dateRange }: RecentActivitiesProps) {
  const activities = propertyActivities[selectedProperty as keyof typeof propertyActivities] || propertyActivities.all;

  // Filter activities based on dateRange if it's defined
  const filteredActivities = dateRange
    ? activities.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        return activityDate >= dateRange.from && activityDate <= dateRange.to;
      })
    : activities;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px]">
          {filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <Link 
                  key={activity.id}
                  href={`/activities/${activity.id}`} 
                  className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md transition-colors"
                >
                  <span className="text-sm truncate mr-2">{activity.description}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No recent activities</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

