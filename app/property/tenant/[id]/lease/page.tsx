import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const leaseDetails = {
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  monthlyRent: 1200,
  securityDeposit: 1200,
  status: "Active",
  propertyName: "Tech Park Plaza",
  unit: "4B",
  documents: [
    {
      name: "Lease Agreement",
      type: "PDF",
      date: "2023-01-01",
      size: "2.4 MB",
    },
    {
      name: "Property Inspection Report",
      type: "PDF",
      date: "2023-01-01",
      size: "1.8 MB",
    },
    {
      name: "House Rules",
      type: "PDF",
      date: "2023-01-01",
      size: "856 KB",
    },
  ],
}

export default function TenantLeasePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Lease Agreement</h1>
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
            {leaseDetails.status}
          </Badge>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>
            Valid from {leaseDetails.startDate} to {leaseDetails.endDate}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Property Name</p>
                <p className="text-lg font-medium">{leaseDetails.propertyName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unit Number</p>
                <p className="text-lg font-medium">{leaseDetails.unit}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Rent</p>
                <p className="text-lg font-medium">${leaseDetails.monthlyRent}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Deposit</p>
                <p className="text-lg font-medium">${leaseDetails.securityDeposit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lease Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaseDetails.documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell className="text-right">
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

