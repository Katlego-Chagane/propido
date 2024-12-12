"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const properties = [
  { id: "1", name: "Sunset Apartments", units: ["1A", "1B", "2A", "2B"] },
  { id: "2", name: "Elm Street House", units: ["Main"] },
  { id: "3", name: "Oak View Condos", units: ["101", "102", "103"] },
]

export function AddAnnouncementForm() {
  const router = useRouter()
  const [propertyId, setPropertyId] = React.useState("")
  const [unit, setUnit] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [sendEmail, setSendEmail] = React.useState(false)
  const [sendSMS, setSendSMS] = React.useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission
    console.log({ propertyId, unit, subject, message, sendEmail, sendSMS })
    router.push('/announcements')
  }

  const selectedProperty = properties.find(p => p.id === propertyId)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="property">Property</Label>
        <Select value={propertyId} onValueChange={(value) => {
          setPropertyId(value)
          setUnit("") // Reset unit when property changes
        }}>
          <SelectTrigger id="property">
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
          <Label htmlFor="unit">Unit (Optional)</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger id="unit">
              <SelectValue placeholder="Select unit (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Units</SelectItem>
              {selectedProperty.units.map(unitNumber => (
                <SelectItem key={unitNumber} value={unitNumber}>{unitNumber}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input 
          id="subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="Announcement subject"
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Announcement message"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="sendEmail" checked={sendEmail} onCheckedChange={setSendEmail} />
          <Label htmlFor="sendEmail">Send email notification</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sendSMS" checked={sendSMS} onCheckedChange={setSendSMS} />
          <Label htmlFor="sendSMS">Send SMS notification</Label>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Send Announcement
      </Button>
    </form>
  )
}

