import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Building, Download } from "lucide-react"
import Link from "next/link"

const propertyData = {
  name: "Tech Park Plaza",
  unit: "4B",
  totalUnits: 40,
  image: "/placeholder.svg?height=200&width=300",
  rentAmount: 1200,
  securityDeposit: 1200,
  leaseStart: "2023-01-01",
  leaseEnd: "2024-12-31",
  rentalStatements: [
    { id: 1, period: "November 2023", amount: 1200, date: "2023-11-01" },
    { id: 2, period: "October 2023", amount: 1200, date: "2023-10-01" },
    { id: 3, period: "September 2023", amount: 1200, date: "2023-09-01" },
  ],
}

export default function TenantPropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{propertyData.name}</h1>
        <Button asChild>
          <Link href={`/property/tenant/${params.id}/maintenance/new`}>Report an Issue</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <div className="aspect-video relative">
            {propertyData.image ? (
              <img
                src={propertyData.image || "/placeholder.svg"}
                alt={propertyData.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <Building className="h-20 w-20 text-muted-foreground" />
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Your Unit</TableCell>
                  <TableCell>Unit {propertyData.unit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Monthly Rent</TableCell>
                  <TableCell>${propertyData.rentAmount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Security Deposit</TableCell>
                  <TableCell>${propertyData.securityDeposit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lease Period</TableCell>
                  <TableCell>
                    {propertyData.leaseStart} to {propertyData.leaseEnd}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rental Statements</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyData.rentalStatements.map((statement) => (
                  <TableRow key={statement.id}>
                    <TableCell>{statement.period}</TableCell>
                    <TableCell>${statement.amount}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

