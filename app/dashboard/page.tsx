"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { PropertyGrid } from "@/components/property-grid"
import { AddPropertyModal } from "@/components/add-property-modal"
import { AddTenantModal } from "@/components/add-tenant-modal"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useAuth } from "@/components/auth-provider"

export default function DashboardPage() {
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || "User"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's an overview of your properties and recent activities.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <DateRangePicker date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      <div className="space-y-8">
        <DashboardStats dateRange={dateRange} />
        <PropertyGrid properties={user?.properties || []} />
      </div>

      <AddPropertyModal open={isAddPropertyModalOpen} onOpenChange={setIsAddPropertyModalOpen} />
      <AddTenantModal open={isAddTenantModalOpen} onOpenChange={setIsAddTenantModalOpen} />
    </div>
  )
}

