"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, PlusCircle, Wrench, Megaphone } from "lucide-react"
import { MaintenanceBarChart } from "@/components/maintenance-bar-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { subDays } from "date-fns"
import type { DateRange } from "@/types"
import { DateRangePicker } from "@/components/ui/date-range-picker"

const maintenanceRequests = [
  {
    id: 1,
    property: {
      name: "Sunset Apartments",
      address: "123 Main St, Apt 4B",
      image: "/placeholder.svg?height=32&width=32",
    },
    issue: "Leaky faucet",
    priority: "Low",
    status: "Reported",
    reportedDate: "2023-11-15",
  },
  {
    id: 2,
    property: {
      name: "Elm Street House",
      address: "456 Elm St, House 7",
      image: "/placeholder.svg?height=32&width=32",
    },
    issue: "Broken AC",
    priority: "High",
    status: "In Progress",
    reportedDate: "2023-11-14",
  },
  {
    id: 3,
    property: {
      name: "Oak View Condos",
      address: "789 Oak St, Unit 2C",
      image: "/placeholder.svg?height=32&width=32",
    },
    issue: "Clogged drain",
    priority: "Medium",
    status: "Resolved",
    reportedDate: "2023-11-13",
  },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "reported", label: "Reported" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "reported":
      return "bg-yellow-500"
    case "in progress":
      return "bg-blue-500"
    case "resolved":
      return "bg-green-500"
    default:
      return "bg-gray-500"
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

export default function MaintenancePage() {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const filteredRequests =
    selectedStatus === "all"
      ? maintenanceRequests
      : maintenanceRequests.filter((request) => request.status.toLowerCase() === selectedStatus.toLowerCase())

  const requestCount = filteredRequests.length

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">All Maintenance</h1>
            <p className="text-sm text-muted-foreground">
              {requestCount} {requestCount === 1 ? "request" : "requests"}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/maintenance/add")}>
                <Wrench className="mr-2 h-4 w-4" />
                New Maintenance Request
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/maintenance/announcement")}>
                <Megaphone className="mr-2 h-4 w-4" />
                New Announcement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card className="border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
            <CardTitle className="text-base font-normal">Request Volume</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DateRangePicker
                date={dateRange}
                setDate={(newDateRange) =>
                  setDateRange(newDateRange || { from: subDays(new Date(), 7), to: new Date() })
                }
              />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <MaintenanceBarChart dateRange={dateRange} className="h-[300px]" />
          </CardContent>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow
                key={request.id}
                onClick={() => router.push(`/maintenance/${request.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  {request.property.image ? (
                    <Avatar>
                      <AvatarImage src={request.property.image} alt={request.property.name} />
                      <AvatarFallback>{request.property.name[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Building className="h-8 w-8 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{request.property.name}</p>
                    <p className="text-sm text-muted-foreground">{request.property.address}</p>
                  </div>
                </TableCell>
                <TableCell>{request.issue}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </TableCell>
                <TableCell>{request.reportedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

