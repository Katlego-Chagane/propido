"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, PlusCircle, Wrench, Megaphone, CalendarIcon } from 'lucide-react'
import { Combobox } from "@/components/ui/combobox"
import { MaintenanceBarChart } from "@/components/maintenance-bar-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/date-range-picker"
import { addDays, startOfMonth, endOfMonth } from "date-fns"
import { DateRange } from "@/types"


const maintenanceRequests = [
  {
    id: 1,
    property: {
      name: "Sunset Apartments",
      address: "123 Main St, Apt 4B",
      image: "/placeholder.svg?height=32&width=32"
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
      image: "/placeholder.svg?height=32&width=32"
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
      image: "/placeholder.svg?height=32&width=32"
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
  const [date, setDate] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })

  const filteredRequests = selectedStatus === "all"
    ? maintenanceRequests
    : maintenanceRequests.filter(request => request.status.toLowerCase() === selectedStatus.toLowerCase())

  const requestCount = filteredRequests.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Maintenance</h1>
          <p className="text-sm text-muted-foreground">
            {requestCount} {requestCount === 1 ? 'request' : 'requests'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Combobox
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Filter by status"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/maintenance/add')}>
                <Wrench className="mr-2 h-4 w-4" />
                New Maintenance Request
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/maintenance/announcement')}>
                <Megaphone className="mr-2 h-4 w-4" />
                New Announcement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <DateRangePicker date={date} setDate={setDate} />
          </div>
          <MaintenanceBarChart className="h-[300px]" dateRange={date} />
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
                <Badge 
                  variant="outline"
                  className={getPriorityColor(request.priority)}
                >
                  {request.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.reportedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

