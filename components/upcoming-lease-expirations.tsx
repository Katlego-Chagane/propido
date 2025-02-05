import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

const propertyLeaseExpirations = {
  "all": [
    { id: 1, tenant: "John Doe", property: "123 Main St, Apt 4B", expirationDate: "2023-12-31", propertyId: "123-main-st" },
    { id: 2, tenant: "Jane Smith", property: "456 Elm St, House 7", expirationDate: "2024-01-15", propertyId: "456-elm-st" },
    { id: 3, tenant: "Bob Johnson", property: "789 Oak St, Unit 2C", expirationDate: "2024-02-28", propertyId: "123-main-st" },
  ],
  "123-main-st": [
    { id: 1, tenant: "John Doe", property: "123 Main St, Apt 4B", expirationDate: "2023-12-31", propertyId: "123-main-st" },
    { id: 3, tenant: "Bob Johnson", property: "789 Oak St, Unit 2C", expirationDate: "2024-02-28", propertyId: "123-main-st" },
  ],
  "456-elm-st": [
    { id: 2, tenant: "Jane Smith", property: "456 Elm St, House 7", expirationDate: "2024-01-15", propertyId: "456-elm-st" },
  ],
}

interface UpcomingLeaseExpirationsProps {
  selectedProperty: string;
  dateRange: { from: Date; to: Date } | undefined;
}

export function UpcomingLeaseExpirations({ selectedProperty, dateRange }: UpcomingLeaseExpirationsProps) {
  const leaseExpirations = propertyLeaseExpirations[selectedProperty as keyof typeof propertyLeaseExpirations] || propertyLeaseExpirations.all;

  // Filter lease expirations based on dateRange if it's defined
  const filteredLeaseExpirations = dateRange
    ? leaseExpirations.filter(lease => {
        const expirationDate = new Date(lease.expirationDate);
        return expirationDate >= dateRange.from && expirationDate <= dateRange.to;
      })
    : leaseExpirations;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Lease Expirations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px]">
          {filteredLeaseExpirations.length > 0 ? (
            <ul className="space-y-4">
              {filteredLeaseExpirations.map((lease) => (
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No upcoming lease expirations</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

