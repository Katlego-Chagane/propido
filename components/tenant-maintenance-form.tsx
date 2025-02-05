"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TenantMaintenanceForm({ tenantId }: { tenantId: string }) {
  const router = useRouter()
  const [issue, setIssue] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission
    console.log({ issue, description, priority })
    console.log(`Submitting maintenance request for tenant ID: ${tenantId}`)
    router.push(`/property/tenant/${tenantId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Maintenance Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="issue">Issue</Label>
            <Input
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Brief description of the issue"
            />
          </div>
          <div>
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about the maintenance issue"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  )
}

