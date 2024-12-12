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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Megaphone } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendAnnouncementEmails } from "@/lib/email-service"

// Mock tenant data
const tenants = [
  { id: "1", email: "tenant1@example.com", name: "Tenant 1" },
  { id: "2", email: "tenant2@example.com", name: "Tenant 2" },
  { id: "3", email: "tenant3@example.com", name: "Tenant 3" },
]

export function AnnouncementModal() {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [property, setProperty] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // Send in-app notification
    console.log("Sending in-app notification")
    // Send email campaign
    await sendAnnouncementEmails(tenants, { subject, message })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Megaphone className="mr-2 h-4 w-4" /> Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Announcement</DialogTitle>
          <DialogDescription>
            Create an announcement for tenants of a specific property.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="property" className="text-right">
                Property
              </Label>
              <Select onValueChange={setProperty}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="123-main-st">123 Main St</SelectItem>
                  <SelectItem value="456-elm-st">456 Elm St</SelectItem>
                  <SelectItem value="789-oak-st">789 Oak St</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input 
                id="subject" 
                className="col-span-3" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea 
                id="message" 
                className="col-span-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Announcement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

