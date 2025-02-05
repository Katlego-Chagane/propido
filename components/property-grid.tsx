"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BuildingIcon, Users, Wrench, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function PropertyGrid({ properties }) {
  const [filter, setFilter] = useState<"all" | "commercial" | "residential">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const itemsPerPage = 8
  const filteredProperties = filter === "all" ? properties : properties.filter((property) => property.type === filter)
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const paginatedProperties = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Properties</h2>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={(value: "all" | "commercial" | "residential") => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/properties/add")}>
                <BuildingIcon className="mr-2 h-4 w-4" />
                New Property
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/tenants/add")}>
                <Users className="mr-2 h-4 w-4" />
                New Tenant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/maintenance/add")}>
                <Wrench className="mr-2 h-4 w-4" />
                New Maintenance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/lease-agreements/add")}>
                <FileText className="mr-2 h-4 w-4" />
                New Lease
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardContent>
              <h2 className="text-lg font-bold">{property.name}</h2>
              <p>{property.address}</p>
              <p>{property.type}</p>
              <p>{property.units} units</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-4 flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

