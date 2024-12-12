"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WrenchIcon, PlusCircle, Building } from 'lucide-react'
import { Combobox } from "@/components/ui/combobox"

const properties = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Main St, Anytown, USA",
    type: "Apartment",
    units: { total: 4, rented: 3 },
    maintenanceCount: 2,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Elm Street House",
    address: "456 Elm St, Somewhere, USA",
    type: "House",
    units: { total: 1, rented: 1 },
    maintenanceCount: 0,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Oak View Condos",
    address: "789 Oak St, Nowhere, USA",
    type: "Condo",
    units: { total: 1, rented: 0 },
    maintenanceCount: 1,
    image: "/placeholder.svg?height=40&width=40",
  },
]

const propertyTypeOptions = [
  { value: "all", label: "All Properties" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
]

const getPropertyTypeBadgeStyle = (type: string) => {
  switch (type.toLowerCase()) {
    case 'apartment':
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
    case 'house':
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
    case 'condo':
      return "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
  }
}

export default function PropertiesPage() {
  const [selectedType, setSelectedType] = useState("all")
  const router = useRouter()

  const filteredProperties = selectedType === "all"
    ? properties
    : properties.filter(property => property.type.toLowerCase() === selectedType)

  const propertyCount = filteredProperties.length

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">All Properties</h1>
          <p className="text-sm text-muted-foreground">
            {propertyCount} {propertyCount === 1 ? 'property' : 'properties'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Combobox
            options={propertyTypeOptions}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Filter by type"
          />
          <Button onClick={() => router.push('/properties/add')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Maintenance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow
                key={property.id}
                onClick={() => router.push(`/properties/${property.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  {property.image ? (
                    <Avatar>
                      <AvatarImage src={property.image} alt={property.name} />
                      <AvatarFallback>{property.name[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Building className="h-8 w-8 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getPropertyTypeBadgeStyle(property.type)}
                  >
                    {property.type}
                  </Badge>
                </TableCell>
                <TableCell>{`${property.units.rented}/${property.units.total} rented`}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <WrenchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{property.maintenanceCount}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

