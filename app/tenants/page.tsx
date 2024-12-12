"use client"

import { useState } from "react"
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
import { Combobox } from "@/components/ui/combobox"
import { useRouter } from "next/navigation"

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

  const filteredTenants = selectedPaymentStatus === "all"
    ? tenants
    : tenants.filter(tenant => tenant.paymentStatus.toLowerCase() === selectedPaymentStatus)

  const tenantCount = filteredTenants.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Tenants</h1>
          <p className="text-sm text-muted-foreground">
            {tenantCount} {tenantCount === 1 ? 'tenant' : 'tenants'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Combobox
            options={paymentStatusOptions}
            value={selectedPaymentStatus}
            onChange={setSelectedPaymentStatus}
            placeholder="All Payment Status"
          />
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
              <TableCell className="font-medium">{tenant.name}</TableCell>
              <TableCell>{tenant.email}</TableCell>
              <TableCell>{tenant.phone}</TableCell>
              <TableCell>{tenant.property}</TableCell>
              <TableCell>{tenant.leaseEnd}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    tenant.paymentStatus === "Paid" ? "success" :
                    tenant.paymentStatus === "Pending" ? "warning" :
                    "destructive"
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
  )
}

