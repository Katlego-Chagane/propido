"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

// Mock tenant data (replace with actual data fetching in a real application)
const tenant = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "(123) 456-7890",
  property: "123 Main St, Anytown, USA",
  leaseStart: "2023-07-01",
  leaseEnd: "2024-06-30",
  rentAmount: 12000,
  securityDeposit: 12000,
  emergencyContact: "Jane Doe",
  emergencyPhone: "(987) 654-3210",
  leaseDocuments: [
    { id: 1, name: "Lease Agreement", date: "2023-07-01" },
    { id: 2, name: "Property Inspection Report", date: "2023-07-01" },
  ],
  rentPayments: [
    { id: 1, date: "2023-07-01", amount: 12000, status: "Paid" },
    { id: 2, date: "2023-08-01", amount: 12000, status: "Pending" },
    { id: 3, date: "2023-09-01", amount: 12000, status: "Paid" },
    { id: 4, date: "2023-10-01", amount: 12000, status: "Paid" },
    { id: 5, date: "2023-11-01", amount: 12000, status: "Pending" },
    { id: 6, date: "2023-12-01", amount: 12000, status: "Paid" },
  ],
  maintenanceRequests: [
    { id: 1, issue: "Leaky faucet", status: "In Progress", date: "2023-07-15", priority: "High", unit: "101" },
    { id: 2, issue: "Broken AC", status: "Resolved", date: "2023-06-20", priority: "Medium", unit: "202" },
    { id: 3, issue: "Clogged drain", status: "Open", date: "2023-08-01", priority: "Low", unit: "303" },
  ],
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

export default function TenantDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [maintenanceFilter, setMaintenanceFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const router = useRouter()

  const filteredMaintenanceRequests =
    maintenanceFilter === "all"
      ? tenant.maintenanceRequests
      : tenant.maintenanceRequests.filter((request) => request.status.toLowerCase() === maintenanceFilter)

  const leaseMonthsRemaining = Math.ceil(
    (new Date(tenant.leaseEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30),
  )

  const totalRentPaid = tenant.rentPayments.reduce(
    (sum, payment) => sum + (payment.status === "Paid" ? payment.amount : 0),
    0,
  )

  const handleStatusChange = (requestId: number, newStatus: string) => {
    // In a real application, you would update the status in your backend
    console.log(`Updating status for request ${requestId} to ${newStatus}`)
  }

  const handleLeaseExtension = (newEndDate: string) => {
    // In a real application, you would update the lease end date in your backend
    console.log(`Extending lease to ${newEndDate}`)
  }

  const handlePaymentStatusUpdate = (paymentId: number, newStatus: string) => {
    // In a real application, you would update the payment status in your backend
    console.log(`Updating payment ${paymentId} status to ${newStatus}`)
  }

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Overview"
      case "lease":
        return "Lease"
      case "payments":
        return "Payments"
      case "maintenance":
        return "Maintenance"
      default:
        return ""
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tenants">Tenants</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{tenant.name}</BreadcrumbPage>
          </BreadcrumbItem>
          {activeTab !== "overview" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-full">
        <CardContent className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-[52px] bg-transparent border-b">
              <TabsTrigger
                value="overview"
                className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="lease"
                className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Lease
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Maintenance
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Tenant Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value={tenant.name} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" value={tenant.email} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Phone
                        </Label>
                        <Input id="phone" value={tenant.phone} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="property" className="text-right">
                          Property
                        </Label>
                        <Input id="property" value={tenant.property} className="col-span-3" readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="emergency-contact" className="text-right">
                          Name
                        </Label>
                        <Input id="emergency-contact" value={tenant.emergencyContact} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="emergency-phone" className="text-right">
                          Phone
                        </Label>
                        <Input id="emergency-phone" value={tenant.emergencyPhone} className="col-span-3" readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="lease" className="mt-6 space-y-4">
              <div className="flex items-center">
                <p className="text-sm">
                  <span className="font-bold">
                    {leaseMonthsRemaining} {leaseMonthsRemaining === 1 ? "month" : "months"}
                  </span>{" "}
                  left on the lease
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Lease Documents</h3>
                  <p className="text-sm text-muted-foreground">{tenant.leaseDocuments.length} documents</p>
                </div>
                <Button onClick={() => router.push("/lease-agreements/add")}>Add New</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenant.leaseDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="payments" className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Payment History</h3>
                  <p className="text-sm text-muted-foreground">{tenant.rentPayments.length} transactions</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select defaultValue="all" onValueChange={(value) => setPaymentStatusFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => router.push(`/tenants/${params.id}/generate-statement`)}>
                    Generate Rental Statement
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenant.rentPayments
                    .filter((payment) => paymentStatusFilter === "all" || payment.status === paymentStatusFilter)
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{format(new Date(payment.date), "dd MMM yyyy")}</TableCell>
                        <TableCell>R {payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              payment.status === "Paid"
                                ? "default"
                                : payment.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              payment.status === "Paid"
                                ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                                : payment.status === "Pending"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
                                  : ""
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="maintenance" className="mt-6 space-y-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Maintenance Requests</h2>
                  <p className="text-sm text-muted-foreground">{filteredMaintenanceRequests.length} total requests</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={maintenanceFilter} onValueChange={setMaintenanceFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => router.push("/maintenance/add")}>Add New</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaintenanceRequests.map((request) => (
                    <TableRow
                      key={request.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/maintenance/${request.id}`)}
                    >
                      <TableCell>{request.unit || "N/A"}</TableCell>
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status.toLowerCase() === "open"
                              ? "secondary"
                              : request.status.toLowerCase() === "in progress"
                                ? "default"
                                : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

