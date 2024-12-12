"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImagePlus, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface PropertyImage {
  url: string;
  file: File;
}

const propertyTypes = ["Apartment", "House", "Condo", "Commercial"]

export function AddPropertyForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [propertyName, setPropertyName] = React.useState("")
  const [propertyType, setPropertyType] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [numUnits, setNumUnits] = React.useState("1")
  const [images, setImages] = React.useState<PropertyImage[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file
      }))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
      return
    }
    // Handle form submission
    console.log({ propertyName, propertyType, address, numUnits, images })
    router.push('/properties')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center space-x-2 mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <span className="text-sm font-medium">Property Details</span>
        <div className="h-px w-8 bg-muted" />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <span className="text-sm font-medium">Property Financials</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property-name">Property Name</Label>
                    <Input
                      id="property-name"
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      placeholder="Enter property name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger id="property-type" className="mt-1.5">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map(type => (
                          <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter property address"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="num-units">Number of Units</Label>
                    <Input
                      id="num-units"
                      type="number"
                      min="1"
                      value={numUnits}
                      onChange={(e) => setNumUnits(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Property Images</Label>
                    <div className="mt-1.5 grid grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-video">
                          <img
                            src={image.url}
                            alt={`Property ${index + 1}`}
                            className="h-full w-full rounded-lg object-cover"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -right-2 -top-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="aspect-video"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImagePlus className="h-6 w-6" />
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
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
                  {Array.from({ length: parseInt(numUnits) }).map((_, index) => (
                    <div key={index} className="grid gap-4 p-4 bg-muted rounded-lg">
                      <div>
                        <Label htmlFor={`unit-name-${index}`}>Unit Name</Label>
                        <Input
                          id={`unit-name-${index}`}
                          placeholder="Enter unit name"
                          className="mt-1.5"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`rent-amount-${index}`}>Rental Amount</Label>
                          <Input
                            id={`rent-amount-${index}`}
                            type="number"
                            placeholder="Enter rent amount"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`deposit-${index}`}>Deposit Required</Label>
                          <Input
                            id={`deposit-${index}`}
                            type="number"
                            placeholder="Enter deposit amount"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Save Property</Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

