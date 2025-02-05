import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface PropertyDetailsProps {
  property: {
    id: string
    address: string
    type: string
    units: number
    rentReceived: number
    rentExpected: number
    deposit: number
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{property.address}</CardTitle>
        <CardDescription>{property.type} - {property.units} units</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={property.address} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type">Type</Label>
                <Input id="type" value={property.type} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="units">Units</Label>
                <Input id="units" value={property.units} className="col-span-3" readOnly />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="income">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rentReceived">Rent Received</Label>
                <Input id="rentReceived" value={`$${property.rentReceived}`} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rentExpected">Rent Expected</Label>
                <Input id="rentExpected" value={`$${property.rentExpected}`} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deposit">Deposit</Label>
                <Input id="deposit" value={`$${property.deposit}`} className="col-span-3" readOnly />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="expenses">
            <p>Expenses content (to be implemented)</p>
          </TabsContent>
          <TabsContent value="tasks">
            <p>Tasks content (to be implemented)</p>
          </TabsContent>
          <TabsContent value="maintenance">
            <p>Maintenance content (to be implemented)</p>
          </TabsContent>
          <TabsContent value="documents">
            <p>Documents content (to be implemented)</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

