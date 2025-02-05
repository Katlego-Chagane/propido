"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

const tenants = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    property: "123 Main St, Anytown, USA",
    leaseEnd: "2024-06-30",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(234) 567-8901",
    property: "456 Elm St, Somewhere, USA",
    leaseEnd: "2024-08-31",
    paymentStatus: "Pending",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "(345) 678-9012",
    property: "789 Oak St, Nowhere, USA",
    leaseEnd: "2024-07-31",
    paymentStatus: "Overdue",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "(456) 789-0123",
    property: "101 Pine St, Elsewhere, USA",
    leaseEnd: "2024-09-30",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    phone: "(567) 890-1234",
    property: "202 Maple Ave, Anytown, USA",
    leaseEnd: "2024-10-31",
    paymentStatus: "Pending",
  },
]

const paymentStatusOptions = [
  { value: "all", label: "All Payment Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
]

export default function TenantsPage() {
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")
  const router = useRouter()

  const filteredTenants =
    selectedPaymentStatus === "all"
      ? tenants
      : tenants.filter((tenant) => tenant.paymentStatus.toLowerCase() === selectedPaymentStatus)

  const tenantCount = filteredTenants.length

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">All Tenants</h1>
            <p className="text-sm text-muted-foreground">
              {tenantCount} {tenantCount === 1 ? "tenant" : "tenants"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/tenants/add">Add New Tenant</Link>
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Lease End</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow
                key={tenant.id}
                onClick={() => router.push(`/tenants/${tenant.id}`)}
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell className="font-medium">
                  {tenant.name.length > 16 ? `${tenant.name.slice(0, 16)}...` : tenant.name}
                </TableCell>
                <TableCell>{tenant.email.length > 16 ? `${tenant.email.slice(0, 16)}...` : tenant.email}</TableCell>
                <TableCell>{tenant.phone.length > 16 ? `${tenant.phone.slice(0, 16)}...` : tenant.phone}</TableCell>
                <TableCell>
                  {tenant.property.length > 16 ? `${tenant.property.slice(0, 16)}...` : tenant.property}
                </TableCell>
                <TableCell>{format(new Date(tenant.leaseEnd), "dd MMM yyyy")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tenant.paymentStatus === "Paid"
                        ? "default"
                        : tenant.paymentStatus === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      tenant.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                        : tenant.paymentStatus === "Pending"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
                          : ""
                    }
                  >
                    {tenant.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

