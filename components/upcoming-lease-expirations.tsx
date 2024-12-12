import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

const leaseExpirations = [
{ id: 1, tenant: "John Doe", property: "123 Main St, Apt 4B", expirationDate: "2023-12-31" },
{ id: 2, tenant: "Jane Smith", property: "456 Elm St, House 7", expirationDate: "2024-01-15" },
{ id: 3, tenant: "Bob Johnson", property: "789 Oak St, Unit 2C", expirationDate: "2024-02-28" },
]

export function UpcomingLeaseExpirations() {
return (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Lease Expirations</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[220px]">
        <ul className="space-y-4">
          {leaseExpirations.map((lease) => (
            <li key={lease.id}>
              <Link 
                href={`/tenants/${lease.id}?tab=lease`}
                className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md transition-colors"
              >
                <div>
                  <p className="font-medium">{lease.tenant}</p>
                  <p className="text-sm text-muted-foreground">{lease.property}</p>
                </div>
                <Badge variant="outline">{lease.expirationDate}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  </Card>
)
}

