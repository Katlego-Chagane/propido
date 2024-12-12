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

const properties = [
  { id: "1", name: "Sunset Apartments", units: ["1A", "1B", "2A", "2B"] },
  { id: "2", name: "Elm Street House", units: ["Main"] },
  { id: "3", name: "Oak View Condos", units: ["101", "102", "103"] },
]

export function AddLeaseAgreementForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [document, setDocument] = useState<File | null>(null)
  const [propertyId, setPropertyId] = useState("")
  const [unit, setUnit] = useState("")

  const selectedProperty = properties.find(p => p.id === propertyId)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocument(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      return
    }
    // Handle form submission
    console.log("Lease agreement added", { document, propertyId, unit })
    router.push('/lease-agreements')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center space-x-2 mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <span className="text-sm font-medium">Upload Document</span>
        <div className="h-px w-8 bg-muted" />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <span className="text-sm font-medium">Customize Lease</span>
        <div className="h-px w-8 bg-muted" />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          3
        </div>
        <span className="text-sm font-medium">Choose Property</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <Label htmlFor="document">Upload Lease Document</Label>
                  <Input
                    id="document"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="mt-1.5"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Next</Button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Lease Customization UI (To be implemented)</p>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Next</Button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property">Choose Property</Label>
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
                      <Label htmlFor="unit">Unit Number</Label>
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
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button type="submit">Save Lease Agreement</Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

