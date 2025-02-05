"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createProperty, uploadPropertyImage } from "@/my-app/lib/services/properties"
import { useAuth } from "@/components/auth-provider"
import type { PropertyFormData } from "@/types/properties"
import { cn } from "@/lib/utils"

const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "land", label: "Land" },
] as const

interface PropertyImage {
  url: string
  file: File
}

export function AddPropertyForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<PropertyFormData>({
    name: "",
    type: "residential",
    address: "",
    units: 1,
    description: "",
    status: "active",
  })
  const [images, setImages] = React.useState<PropertyImage[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
      return
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a property",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Create property
      const property = await createProperty(formData, user.id)

      console.log("Property created:", property) // Log the created property

      // Upload images if any
      if (images.length > 0) {
        try {
          await uploadPropertyImage(images[0].file, property.id)
          console.log("Image uploaded successfully")
        } catch (imageError) {
          console.error("Error uploading image:", imageError)
          toast({
            title: "Warning",
            description: "Property created, but there was an error uploading the image.",
            variant: "warning",
          })
        }
      }

      toast({
        title: "Success",
        description: "Property created successfully",
      })

      router.push("/properties")
      router.refresh()
    } catch (error) {
      console.error("Error creating property:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred while creating the property",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center space-x-2 mb-8">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          1
        </div>
        <span className="text-sm font-medium">Property Details</span>
        <div className="h-px w-8 bg-muted" />
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>
        <span className="text-sm font-medium">Property Units</span>
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
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter property name"
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: PropertyFormData["type"]) =>
                        setFormData((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger id="property-type" className="mt-1.5">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter property address"
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter property description"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Property Images</Label>
                    <div className="mt-1.5 grid grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-video">
                          <img
                            src={image.url || "/placeholder.svg"}
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
                <div>
                  <Label htmlFor="num-units">Number of Units</Label>
                  <Input
                    id="num-units"
                    type="number"
                    min="1"
                    value={formData.units}
                    onChange={(e) => setFormData((prev) => ({ ...prev, units: Number.parseInt(e.target.value) }))}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Property"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

