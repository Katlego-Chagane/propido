"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock data for available properties
const availableProperties = [
  { id: "1", name: "123 Main St, Anytown, USA", type: "multi", availableUnits: ["1A", "2B"] },
  { id: "2", name: "456 Elm St, Somewhere, USA", type: "single", availableUnits: ["1"] },
  { id: "3", name: "789 Oak St, Nowhere, USA", type: "multi", availableUnits: ["1A", "2B", "3C"] },
]

export function AddTenantForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [property, setProperty] = useState("")
  const [unit, setUnit] = useState("")

  const selectedProperty = availableProperties.find(p => p.id === property)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
      return
    }
    // Handle form submission
    console.log("Tenant added:", { name, email, phone, property, unit })
    router.push('/tenants')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center space-x-2 mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <span className="text-sm font-medium">Personal Details</span>
        <div className="h-px w-8 bg-muted" />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <span className="text-sm font-medium">Property Assignment</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter tenant name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Next</Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property">Property</Label>
                    <Select value={property} onValueChange={(value) => {
                      setProperty(value)
                      setUnit("")
                    }}>
                      <SelectTrigger id="property" className="mt-1.5">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProperties.map((prop) => (
                          <SelectItem key={prop.id} value={prop.id}>
                            {prop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedProperty && (
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Select value={unit} onValueChange={setUnit}>
                        <SelectTrigger id="unit" className="mt-1.5">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedProperty.availableUnits.map((unitNumber) => (
                            <SelectItem key={unitNumber} value={unitNumber}>
                              Unit {unitNumber}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Add Tenant</Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

