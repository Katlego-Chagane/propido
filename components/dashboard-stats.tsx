import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

export function DashboardStats({ dateRange }: { dateRange: DateRange }) {
  // Dummy data
  const allData = {
    totalProperties: { current: 13, previous: 10 },
    occupancyRate: { current: 102, previous: 87 },
    totalRevenue: { current: 397997, previous: 321428 }, // in cents
    pendingMaintenance: { current: 8, previous: 10 },
  }

  // Filter function
  const filterData = (data: typeof allData) => {
    if (dateRange.from && dateRange.to) {
      // Simulate filtering based on date range
      const randomFactor = Math.random() * 0.4 + 0.8 // Random factor between 0.8 and 1.2
      return {
        totalProperties: {
          current: Math.round(data.totalProperties.current * randomFactor),
          previous: data.totalProperties.previous,
        },
        occupancyRate: {
          current: Math.round(data.occupancyRate.current * randomFactor),
          previous: data.occupancyRate.previous,
        },
        totalRevenue: {
          current: Math.round(data.totalRevenue.current * randomFactor),
          previous: data.totalRevenue.previous,
        },
        pendingMaintenance: {
          current: Math.round(data.pendingMaintenance.current * randomFactor),
          previous: data.pendingMaintenance.previous,
        },
      }
    }
    return data
  }

  const filteredData = filterData(allData)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredData.totalProperties.current}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />+
            {filteredData.totalProperties.current - filteredData.totalProperties.previous} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredData.occupancyRate.current}%</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />+
            {filteredData.occupancyRate.current - filteredData.occupancyRate.previous}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R{(filteredData.totalRevenue.current / 100).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />+
            {(
              ((filteredData.totalRevenue.current - filteredData.totalRevenue.previous) /
                filteredData.totalRevenue.previous) *
              100
            ).toFixed(0)}
            % from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredData.pendingMaintenance.current}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />-
            {filteredData.pendingMaintenance.previous - filteredData.pendingMaintenance.current} from last week
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

