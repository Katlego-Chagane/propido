import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

const maintenanceRequests = [
  {
    id: 1,
    issue: "Leaky faucet",
    status: "In Progress",
    priority: "Medium",
    date: "2023-11-15",
    location: "Bathroom",
  },
  {
    id: 2,
    issue: "Broken AC",
    status: "Resolved",
    priority: "High",
    date: "2023-10-20",
    location: "Living Room",
  },
  {
    id: 3,
    issue: "Clogged drain",
    status: "Open",
    priority: "Low",
    date: "2023-11-25",
    location: "Kitchen",
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
    default:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
  }
}

export default function TenantMaintenancePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Requests</h1>
          <p className="text-sm text-muted-foreground">{maintenanceRequests.length} total requests</p>
        </div>
        <Button asChild>
          <Link href={`/property/tenant/${params.id}/maintenance/new`}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceRequests.map((request) => (
                <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>{request.issue}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/property/tenant/${params.id}/maintenance/${request.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

