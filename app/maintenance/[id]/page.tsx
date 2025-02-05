"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MaintenanceConversation } from "@/components/maintenance-conversation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from an API or database
const maintenanceRequest = {
  id: "1",
  property: {
    name: "Sunset Apartments",
    address: "123 Main St, Apt 4B",
    image: "/placeholder.svg?height=32&width=32",
    id: "123",
    unit: "4B",
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
                <BreadcrumbLink href="/maintenance">Maintenance</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/properties/${maintenanceRequest.property.id}`}>
                  {maintenanceRequest.property.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
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

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full justify-start h-[52px] bg-transparent border-b">
          <TabsTrigger
            value="details"
            className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="conversation"
            className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Conversation
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6 space-y-4">
          {/* Existing details content */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Property</p>
                  <p className="text-lg font-semibold">{maintenanceRequest.property.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{maintenanceRequest.property.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Issue</p>
                  <p className="text-lg font-semibold">{maintenanceRequest.issue}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</p>
                <p className="text-base text-gray-500 dark:text-gray-400">{maintenanceRequest.description}</p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reported Date</p>
                  <p className="text-base text-gray-500 dark:text-gray-400">{maintenanceRequest.reportedDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Completion</p>
                  <p className="text-base text-gray-500 dark:text-gray-400">{maintenanceRequest.estimatedCompletion}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned To</p>
                  <p className="text-base text-gray-500 dark:text-gray-400">{maintenanceRequest.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-base text-gray-500 dark:text-gray-400">{maintenanceRequest.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversation" className="mt-6">
          <MaintenanceConversation maintenanceId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

