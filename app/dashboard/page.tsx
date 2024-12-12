"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivities } from "@/components/recent-activities"
import { Overview } from "@/components/overview"
import { UpcomingLeaseExpirations } from "@/components/upcoming-lease-expirations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusIcon, Building, Users, Wrench, FileText } from 'lucide-react'
import { Combobox } from "@/components/ui/combobox"
import { AddPropertyModal } from "@/components/add-property-modal"
import { AddTenantModal } from "@/components/add-tenant-modal"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const properties = [
  { value: "all", label: "All Properties" },
  { value: "123-main-st", label: "123 Main St" },
  { value: "456-elm-st", label: "456 Elm St" },
]

export default function DashboardPage() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0].value)
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false)
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const router = useRouter()

  const { currentDate, thirtyDaysAgo } = useMemo(() => {
    const current = new Date(date);
    const thirtyDays = new Date(current);
    thirtyDays.setDate(current.getDate() - 30);
    return {
      currentDate: current.toISOString().split('T')[0],
      thirtyDaysAgo: thirtyDays.toISOString().split('T')[0]
    };
  }, [date]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
            Welcome, John Doe
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Here's an overview of your properties and recent activities.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Combobox
            options={properties}
            value={selectedProperty}
            onChange={setSelectedProperty}
            placeholder="Select property"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" /> Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push('/properties/add')}>
                <Building className="mr-2 h-4 w-4" /> Add Property
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/tenants/add')}>
                <Users className="mr-2 h-4 w-4" /> Add Tenant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/maintenance/add')}>
                <Wrench className="mr-2 h-4 w-4" /> Add Maintenance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/lease-agreements/add')}>
                <FileText className="mr-2 h-4 w-4" /> Add Lease
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Revenue Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                value={date ? date : ''}
                onChange={(e) => setDate(e.target.value)}
                className="w-[180px]"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Overview className="w-full h-[400px]" />
          </CardContent>
        </Card>
        <div className="col-span-full lg:col-span-3 space-y-6">
          <Card>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <RecentActivities dateRange={{ from: thirtyDaysAgo, to: currentDate }} />
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <UpcomingLeaseExpirations dateRange={{ from: thirtyDaysAgo, to: currentDate }} />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      <AddPropertyModal open={isAddPropertyModalOpen} onOpenChange={setIsAddPropertyModalOpen} />
      <AddTenantModal open={isAddTenantModalOpen} onOpenChange={setIsAddTenantModalOpen} />
    </div>
  )
}

