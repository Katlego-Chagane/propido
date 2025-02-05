import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building, Plus } from "lucide-react"

// Dummy data for tenant
const tenantData = {
  id: "123",
  name: "Alice Johnson",
  property: {
    id: "456",
    name: "Tech Park Plaza",
    unit: "4B",
    totalUnits: 40,
    image: "/placeholder.svg?height=200&width=300",
  },
  leaseEnd: "2024-12-31",
  rentDue: "2023-12-01",
  rentAmount: 1200,
}

export function TenantDashboard({ tenantId }: { tenantId: string }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {tenantData.name}</h1>
        <Button asChild>
          <Link href={`/property/tenant/${tenantId}/maintenance/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Maintenance
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Rent Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantData.rentDue}</div>
            <p className="text-xs text-muted-foreground">${tenantData.rentAmount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lease Ends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantData.leaseEnd}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${tenantData.rentAmount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="relative aspect-[4/3]">
            {tenantData.property.image ? (
              <img
                src={tenantData.property.image || "/placeholder.svg"}
                alt={tenantData.property.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <Building className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1">{tenantData.property.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">Unit {tenantData.property.unit}</p>
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href={`/property/tenant/${tenantId}/property`}>View Property</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

