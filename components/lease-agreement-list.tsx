import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from 'lucide-react'
import { format } from 'date-fns'

const leaseAgreements = [
  { id: 1, tenant: "John Doe", property: "123 Main St, Apt 4B", startDate: "2023-01-01", endDate: "2023-12-31", status: "Active" },
  { id: 2, tenant: "Jane Smith", property: "456 Elm St, House 7", startDate: "2023-03-15", endDate: "2024-03-14", status: "Active" },
  { id: 3, tenant: "Bob Johnson", property: "789 Oak St, Unit 2C", startDate: "2022-07-01", endDate: "2023-06-30", status: "Expiring Soon" },
  { id: 4, tenant: "Alice Brown", property: "101 Pine St, Apt 3A", startDate: "2023-05-01", endDate: "2024-04-30", status: "Active" },
  { id: 5, tenant: "Charlie Davis", property: "202 Maple Ave, House 12", startDate: "2022-11-01", endDate: "2023-10-31", status: "Expiring Soon" },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
    case 'expiring soon':
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500"
    case 'expired':
      return "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
  }
}

export function LeaseAgreementList({ selectedStatus }: { selectedStatus: string }) {
  const filteredAgreements = selectedStatus === "all"
    ? leaseAgreements
    : leaseAgreements.filter(agreement => agreement.status.toLowerCase().replace(' ', '-') === selectedStatus)

  return (
    <div>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgreements.map((agreement) => (
              <TableRow key={agreement.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{agreement.tenant}</TableCell>
                <TableCell>{agreement.property}</TableCell>
                <TableCell>{format(new Date(agreement.startDate), 'd MMM yyyy')}</TableCell>
                <TableCell>{format(new Date(agreement.endDate), 'd MMM yyyy')}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(agreement.status)} whitespace-nowrap`}
                  >
                    {agreement.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-1" /> Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}

