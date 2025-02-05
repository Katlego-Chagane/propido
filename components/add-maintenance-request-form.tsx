"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const properties = [
  { id: "1", name: "Sunset Apartments", units: ["1A", "1B", "2A", "2B"] },
  { id: "2", name: "Elm Street House", units: ["Main"] },
  { id: "3", name: "Oak View Condos", units: ["101", "102", "103"] },
]

const priorityLevels = ["Low", "Medium", "High", "Urgent"]

export function AddMaintenanceRequestForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [propertyId, setPropertyId] = React.useState("")
  const [unit, setUnit] = React.useState("")
  const [issue, setIssue] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [priority, setPriority] = React.useState("")

  const selectedProperty = properties.find(p => p.id === propertyId)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
      return
    }
    // Handle form submission
    console.log({ propertyId, unit, issue, description, priority })
    router.push('/maintenance')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center space-x-2 mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <span className="text-sm font-medium">Location Details</span>
        <div className="h-px w-8 bg-muted" />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <span className="text-sm font-medium">Issue Details</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property">Property</Label>
                    <Select value={propertyId} onValueChange={(value) => {
                      setPropertyId(value)
                      setUnit("")
                    }}>
                      <SelectTrigger id="property" className="mt-1.5">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map(property => (
                          <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
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
                          {selectedProperty.units.map(unitNumber => (
                            <SelectItem key={unitNumber} value={unitNumber}>{unitNumber}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Next</Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="issue">Issue</Label>
                    <Input
                      id="issue"
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="Brief description of the issue"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide more details about the maintenance issue"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger id="priority" className="mt-1.5">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map(level => (
                          <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

