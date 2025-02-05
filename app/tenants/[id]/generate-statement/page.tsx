"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DateRangePicker } from "@/components/date-range-picker"
import { StepIndicator } from "@/components/step-indicator"

const steps = [
  { number: 1, title: "Select Period" },
  { number: 2, title: "Preview" },
  { number: 3, title: "Send" },
]

export default function GenerateRentalStatementPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [statementSent, setStatementSent] = useState(false)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSendStatement = () => {
    // Here you would implement the logic to send the statement
    setStatementSent(true)
  }

  return (
    <div className="w-full p-8">
      <BreadcrumbList className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/tenants" className="text-muted-foreground hover:text-foreground">
              Tenants
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/tenants/${params.id}`} className="text-muted-foreground hover:text-foreground">
              Tenant Details
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <span className="font-bold text-primary">Generate Rental Statement</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>

      <Card>
        <CardContent className="pt-6">
          <StepIndicator currentStep={currentStep} steps={steps} />

          <div className="mt-6 space-y-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                <DateRangePicker date={dateRange} setDate={setDateRange} />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Statement Preview</h3>
                <p>Preview of the rental statement would be shown here.</p>
                {/* Add your PDF preview component here */}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Send Statement</h3>
                {statementSent ? (
                  <p className="text-green-600">Statement sent successfully to the tenant.</p>
                ) : (
                  <Button onClick={handleSendStatement}>Send to Tenant</Button>
                )}
                <Button variant="outline">Download PDF</Button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 1 && <Button onClick={handleBack}>Back</Button>}
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button onClick={() => router.push(`/tenants/${params.id}`)} className="ml-auto">
                  Finish
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

