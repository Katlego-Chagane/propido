"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaseAgreementDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [document, setDocument] = useState<File | null>(null)

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/lease-agreements">Lease Agreements</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lease Agreement Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full justify-start h-[52px] bg-transparent border-b">
          <TabsTrigger
            value="details"
            className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="document"
            className="relative h-[52px] rounded-none border-0 px-4 pb-3 pt-3 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Document
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6 space-y-4">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <p>Details content here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="document" className="mt-6">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <label htmlFor="document" className="flex flex-col items-center justify-center w-full h-full">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                  </label>
                  <Input
                    id="document"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setDocument(file)
                      }
                    }}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                {document && (
                  <div className="text-center">
                    <p className="text-sm text-green-600 mb-4">File uploaded: {document.name}</p>
                    <Button type="button">Next</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

