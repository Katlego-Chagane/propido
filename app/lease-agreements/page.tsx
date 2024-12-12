"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LeaseAgreementList } from "@/components/lease-agreement-list"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { Combobox } from "@/components/ui/combobox"

const leaseStatusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "expiring-soon", label: "Expiring Soon" },
  { value: "expired", label: "Expired" },
]

export default function LeaseAgreementsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const router = useRouter()

  return (
    <div className="py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lease Agreements</h1>
          <p className="text-sm text-muted-foreground">
            5 total documents
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Combobox
            options={leaseStatusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Filter by status"
          />
          <Button onClick={() => router.push('/lease-agreements/add')}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <LeaseAgreementList selectedStatus={selectedStatus} />
    </div>
  )
}

