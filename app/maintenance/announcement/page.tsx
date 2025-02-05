"use client"

import { useState } from "react"
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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { AddAnnouncementForm } from "@/components/add-announcement-form"

export default function NewAnnouncementPage() {
  //const router = useRouter()
  //const [property, setProperty] = useState("")
  //const [subject, setSubject] = useState("")
  //const [message, setMessage] = useState("")

  //const handleSubmit = (event: React.FormEvent) => {
  //  event.preventDefault()
  //  // Handle form submission here
  //  console.log("Announcement created:", { property, subject, message })
  //  router.push('/maintenance')
  //}

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/maintenance">Maintenance</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="font-bold text-primary">New Announcement</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-3xl mx-auto">
        <AddAnnouncementForm />
      </div>
    </div>
  )
}

