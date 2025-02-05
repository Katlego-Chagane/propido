"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LeaseAgreementList } from "@/components/lease-agreement-list"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "expiring-soon", label: "Expiring Soon" },
  { value: "expired", label: "Expired" },
]

export default function LeaseAgreementsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const router = useRouter()

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Lease Agreements</h1>
            <p className="text-sm text-muted-foreground">
              5 total documents
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
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
            <Button onClick={() => router.push('/lease-agreements/add')}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
        </div>
        <LeaseAgreementList selectedStatus={selectedStatus} />
      </div>
    </div>
  )
}

