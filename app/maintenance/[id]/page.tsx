"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { MaintenanceConversation } from "@/components/maintenance-conversation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Calendar, User } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would typically come from an API or database
const maintenanceRequest = {
  id: "1",
  property: {
    name: "Sunset Apartments",
    address: "123 Main St, Apt 4B",
    image: "/placeholder.svg?height=32&width=32",
    id: "123",
    unit: "4B"
  },
  issue: "Leaky faucet in master bathroom",
  description: "The faucet has been dripping constantly for the past few days",
  priority: "High",
  status: "In Progress",
  reportedDate: "2024-02-10",
  assignedTo: "John Smith",
  category: "Plumbing",
  estimatedCompletion: "2024-02-15",
}

const statusOptions = [
  { value: "New", label: "New" },
  { value: "In Progress", label: "In Progress" },
  { value: "On Hold", label: "On Hold" },
  { value: "Resolved", label: "Resolved" },
]

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
    case 'medium':
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500"
    case 'low':
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
  }
}

export default function MaintenanceDetailsPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(maintenanceRequest.status)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In a real application, you would update the status in your backend here
    console.log(`Status updated to: ${newStatus}`)
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/maintenance" className="text-muted-foreground hover:text-foreground">
                  Maintenance
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`/properties/${maintenanceRequest.property.id}`} className="text-muted-foreground hover:text-foreground">
                  {maintenanceRequest.property.name}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-semibold">
                  {maintenanceRequest.property.name} - Unit {maintenanceRequest.property.unit}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={getPriorityColor(maintenanceRequest.priority)}>
            {maintenanceRequest.priority}
          </Badge>
          <Select onValueChange={handleStatusChange} defaultValue={status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Removed lines as per update 1 */}

      <Card className="mt-6">
        <CardContent className="p-0">
          <MaintenanceConversation maintenanceId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}

