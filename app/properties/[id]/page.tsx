"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { PlusCircle, MoreHorizontal, Trash2, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { format } from "date-fns"

// This would typically come from an API or database
const property = {
  id: "1",
  name: "Sunset Apartments",
  address: "123 Main St, Anytown, USA",
  type: "Apartment",
  units: [
    { number: "1A", tenant: "John Doe", rentAmount: 1000, deposit: 1000, status: "Occupied", isEditing: false },
    { number: "2B", tenant: "Jane Smith", rentAmount: 1200, deposit: 1200, status: "Occupied", isEditing: false },
    { number: "3C", tenant: null, rentAmount: 1100, deposit: 1100, status: "Vacant", isEditing: false },
  ],
  rentReceived: 4000,
  rentExpected: 4800,
  deposit: 6000,
  maintenanceRequests: [
    { id: 1, unit: "1A", issue: "Leaky faucet", status: "In Progress", date: "2023-06-01" },
    { id: 2, unit: "2B", issue: "Broken AC", status: "Completed", date: "2023-05-15" },
    { id: 3, unit: "3C", issue: "Paint touch-up", status: "Scheduled", date: "2023-06-10" },
  ],
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const [propertyData, setPropertyData] = useState(property)
  const [newRequest, setNewRequest] = useState({ unit: "", issue: "", status: "Pending" })
  const [isEditingAll, setIsEditingAll] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [occupancyFilter, setOccupancyFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyData({ ...propertyData, [e.target.id]: e.target.value })
  }

  const handleNewRequestChange = (field: string, value: string) => {
    setNewRequest({ ...newRequest, [field]: value })
  }

  const addMaintenanceRequest = () => {
    const updatedRequests = [
      ...propertyData.maintenanceRequests,
      {
        id: propertyData.maintenanceRequests.length + 1,
        ...newRequest,
        date: new Date().toISOString().split("T")[0],
      },
    ]
    setPropertyData({ ...propertyData, maintenanceRequests: updatedRequests })
    setNewRequest({ unit: "", issue: "", status: "Pending" })
  }

  const handleEditUnit = (unitNumber: string) => {
    const updatedUnits = propertyData.units.map((unit) =>
      unit.number === unitNumber ? { ...unit, isEditing: true } : unit,
    )
    setPropertyData({ ...propertyData, units: updatedUnits })
  }

  const handleUnitChange = (unitNumber: string, field: "rentAmount" | "deposit", value: string) => {
    const updatedUnits = propertyData.units.map((unit) =>
      unit.number === unitNumber ? { ...unit, [field]: Number.parseFloat(value) || 0 } : unit,
    )
    setPropertyData({ ...propertyData, units: updatedUnits })
  }

  const handleSaveUnit = (unit: any) => {
    const updatedUnits = propertyData.units.map((u) => (u.number === unit.number ? { ...u, isEditing: false } : u))
    setPropertyData({ ...propertyData, units: updatedUnits })
  }

  const handleSaveAllUnits = () => {
    const updatedUnits = propertyData.units.map((unit) => ({ ...unit, isEditing: false }))
    setPropertyData({ ...propertyData, units: updatedUnits })
    setIsEditingAll(false)
  }

  const handleUnitAction = (unit: any, action: string) => {
    if (action === "update-rent") {
      const updatedUnits = propertyData.units.map((u) => (u.number === unit.number ? { ...u, isEditing: true } : u))
      setPropertyData({ ...propertyData, units: updatedUnits })
    } else if (action === "view-tenant") {
      router.push(`/tenants/${unit.tenant}`)
    } else if (action === "add-tenant") {
      router.push(`/tenants/add?property=${params.id}&unit=${unit.number}`)
    }
  }

  const handleDeleteProperty = () => {
    if (deleteConfirmation === "DELETE") {
      // In a real app, you would make an API call here
      console.log("Deleting property:", params.id)
      router.push("/properties")
    }
  }

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Overview"
      case "units":
        return "Units"
      case "financials":
        return "Financials"
      case "maintenance":
        return "Maintenance"
      case "danger":
        return "Danger Zone"
      default:
        return ""
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/properties">Properties</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{propertyData.name}</BreadcrumbPage>
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
        <CardContent className="p-0">
          <div className="border-b">
            <div className="px-4 md:px-6 py-4">
              <h2 className="text-2xl font-bold">Property Overview</h2>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start h-[52px] px-4 md:px-6 bg-transparent border-0">
                <TabsTrigger
                  value="overview"
                  className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="units"
                  className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Units
                </TabsTrigger>
                <TabsTrigger
                  value="financials"
                  className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Financials
                </TabsTrigger>
                <TabsTrigger
                  value="maintenance"
                  className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Maintenance
                </TabsTrigger>
                <TabsTrigger
                  value="danger"
                  className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Danger Zone
                </TabsTrigger>
              </TabsList>
              <div className="p-4 md:p-6">
                <TabsContent value="overview" className="mt-0 border-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Property Details</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Address</TableCell>
                          <TableCell>
                            <Input
                              id="address"
                              value={propertyData.address}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Type</TableCell>
                          <TableCell>
                            <Input
                              id="type"
                              value={propertyData.type}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="units" className="mt-0 border-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Unit Details</h3>
                    <p className="text-sm text-muted-foreground">{propertyData.units.length} total units</p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Unit Number</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Rent Amount</TableHead>
                        <TableHead>Deposit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propertyData.units.map((unit) => (
                        <TableRow key={unit.number} className="cursor-pointer hover:bg-muted">
                          <TableCell>{unit.number}</TableCell>
                          <TableCell>{unit.tenant || "N/A"}</TableCell>
                          <TableCell>
                            {unit.isEditing ? (
                              <Input
                                type="number"
                                value={unit.rentAmount}
                                onChange={(e) => {
                                  const updatedUnits = propertyData.units.map((u) =>
                                    u.number === unit.number
                                      ? { ...u, rentAmount: Number.parseFloat(e.target.value) }
                                      : u,
                                  )
                                  setPropertyData({ ...propertyData, units: updatedUnits })
                                }}
                              />
                            ) : (
                              `$${unit.rentAmount}`
                            )}
                          </TableCell>
                          <TableCell>
                            {unit.isEditing ? (
                              <Input
                                type="number"
                                value={unit.deposit}
                                onChange={(e) => {
                                  const updatedUnits = propertyData.units.map((u) =>
                                    u.number === unit.number ? { ...u, deposit: Number.parseFloat(e.target.value) } : u,
                                  )
                                  setPropertyData({ ...propertyData, units: updatedUnits })
                                }}
                              />
                            ) : (
                              `$${unit.deposit}`
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={unit.status === "Occupied" ? "default" : "secondary"}>{unit.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleUnitAction(unit, "update-rent")}>
                                  Edit Rental Amount and Deposit
                                </DropdownMenuItem>
                                {unit.status === "Occupied" ? (
                                  <DropdownMenuItem onClick={() => handleUnitAction(unit, "view-tenant")}>
                                    View Tenant
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleUnitAction(unit, "add-tenant")}>
                                    Add Tenant
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => router.push("/maintenance/add")}>
                                  Send Maintenance Ticket
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="financials" className="mt-0 border-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Financial Overview</h3>
                    <div className="flex items-center space-x-4">
                      <Select defaultValue="all" onValueChange={(value) => setOccupancyFilter(value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by occupancy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Units</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="vacant">Vacant</SelectItem>
                        </SelectContent>
                      </Select>
                      <DateRangePicker date={dateRange} setDate={setDateRange} />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rent Received</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${propertyData.rentReceived}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rent Expected</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${propertyData.rentExpected}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${propertyData.deposit}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Unit Details</h3>
                    <p className="text-sm text-muted-foreground">{propertyData.units.length} total units</p>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Unit Number</TableHead>
                        <TableHead>Rent Amount</TableHead>
                        <TableHead>Deposit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propertyData.units
                        .filter((unit) => occupancyFilter === "all" || unit.status.toLowerCase() === occupancyFilter)
                        .map((unit) => (
                          <TableRow key={unit.number}>
                            <TableCell>{unit.number}</TableCell>
                            <TableCell>${unit.rentAmount}</TableCell>
                            <TableCell>${unit.deposit}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  unit.status === "Occupied"
                                    ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500"
                                }
                              >
                                {unit.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleUnitAction(unit, "update-rent")}>
                                    Edit Rental Amount and Deposit
                                  </DropdownMenuItem>
                                  {unit.status === "Occupied" ? (
                                    <DropdownMenuItem onClick={() => handleUnitAction(unit, "view-tenant")}>
                                      View Tenant
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={() => handleUnitAction(unit, "add-tenant")}>
                                      Add Tenant
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="maintenance" className="mt-0 border-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Maintenance Requests</h3>
                    <Dialog>
                      <Link href="/maintenance/add">
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          New Request
                        </Button>
                      </Link>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Unit</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propertyData.maintenanceRequests.map((request) => (
                        <TableRow
                          key={request.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => router.push(`/maintenance/${request.id}`)}
                        >
                          <TableCell>
                            <Link href={`/maintenance?unit=${request.unit}`} className="text-primary hover:underline">
                              {request.unit}
                            </Link>
                          </TableCell>
                          <TableCell>{request.issue}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "Completed"
                                  ? "default"
                                  : request.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(request.date), "dd MMM yyyy")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="danger" className="mt-0 border-0">
                  <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                  <Alert variant="destructive">
                    <AlertDescription>
                      Deleting this property will permanently remove it and all associated data. Tenants will lose
                      access to their information.
                    </AlertDescription>
                  </Alert>
                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Property
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Property</DialogTitle>
                        <DialogDescription>This action cannot be undone. Type DELETE to confirm.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="Type DELETE to confirm"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteProperty}
                          disabled={deleteConfirmation !== "DELETE"}
                        >
                          Delete Property
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

