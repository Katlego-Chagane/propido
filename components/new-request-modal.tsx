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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

interface NewRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewRequestModal({ open, onOpenChange }: NewRequestModalProps) {
  const [requestType, setRequestType] = useState("tenant")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Maintenance request submitted")
    onOpenChange(false)
    toast.success("Maintenance request submitted successfully!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Maintenance Request</DialogTitle>
          <DialogDescription>
            Describe the issue and provide details about the maintenance request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="request-type" className="text-right">
                Request Type
              </Label>
              <RadioGroup
                defaultValue="tenant"
                onValueChange={setRequestType}
                className="flex col-span-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tenant" id="tenant" />
                  <Label htmlFor="tenant">Tenant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landlord" id="landlord" />
                  <Label htmlFor="landlord">Landlord</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="property" className="text-right">
                Property
              </Label>
              <Input id="property" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issue" className="text-right">
                Issue
              </Label>
              <Input id="issue" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {requestType === "landlord" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estimated-cost" className="text-right">
                  Estimated Cost
                </Label>
                <Input id="estimated-cost" type="number" className="col-span-3" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

