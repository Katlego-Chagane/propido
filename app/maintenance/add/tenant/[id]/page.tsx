"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"

// Mock function to fetch tenant data
const fetchTenant = async (id: string) => {
  // In a real application, this would be an API call
  return { id, name: "John Doe" }
}

export default function AddMaintenanceRequestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tenant, setTenant] = useState<{ id: string; name: string } | null>(null)
  const [issue, setIssue] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")

  useEffect(() => {
    const loadTenant = async () => {
      const tenantData = await fetchTenant(params.id)
      setTenant(tenantData)
    }
    loadTenant()
  }, [params.id])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Maintenance request added:", { tenant: params.id, issue, description, priority })
    router.push('/maintenance')
  }

  if (!tenant) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbPage>
          <span className="font-bold text-primary">Add New Maintenance Request</span>
        </BreadcrumbPage>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/maintenance" className="text-muted-foreground hover:text-foreground">
              Maintenance
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/tenants/${tenant.id}`} className="text-muted-foreground hover:text-foreground">
              {tenant.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="font-bold text-primary">Add New Maintenance Request</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Add New Maintenance Request for {tenant.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="issue">Issue</Label>
              <Input
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={setPriority} value={priority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Add Maintenance Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

