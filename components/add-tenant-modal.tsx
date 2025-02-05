"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface AddTenantModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for available properties
const availableProperties = [
  { id: "1", name: "123 Main St, Anytown, USA", type: "multi", availableUnits: 2 },
  { id: "2", name: "456 Elm St, Somewhere, USA", type: "single", availableUnits: 1 },
  { id: "3", name: "789 Oak St, Nowhere, USA", type: "multi", availableUnits: 0 },
]

export function AddTenantModal({ open, onOpenChange }: AddTenantModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [property, setProperty] = useState("")
  const [leaseStart, setLeaseStart] = useState("")
  const [leaseEnd, setLeaseEnd] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Tenant added:", { name, email, phone, property, leaseStart, leaseEnd })
    onOpenChange(false)
  }

  const selectedProperty = availableProperties.find(p => p.id === property)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tenant</DialogTitle>
          <DialogDescription>
            Enter the details of the new tenant. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="property" className="text-right">
                Property
              </Label>
              <Select onValueChange={setProperty} value={property}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {availableProperties.map((prop) => (
                    <SelectItem key={prop.id} value={prop.id} disabled={prop.availableUnits === 0}>
                      {prop.name} ({prop.availableUnits} unit{prop.availableUnits !== 1 ? 's' : ''} available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedProperty && selectedProperty.availableUnits === 0 && (
              <div className="text-sm text-red-500">
                Warning: This property has no available units. Please terminate a tenant lease before proceeding.
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lease-start" className="text-right">
                Lease Start
              </Label>
              <Input
                id="lease-start"
                type="date"
                value={leaseStart}
                onChange={(e) => setLeaseStart(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lease-end" className="text-right">
                Lease End
              </Label>
              <Input
                id="lease-end"
                type="date"
                value={leaseEnd}
                onChange={(e) => setLeaseEnd(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={selectedProperty?.availableUnits === 0}>Add Tenant</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

