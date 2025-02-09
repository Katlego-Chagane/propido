import Link from "next/link"
import { AddMaintenanceRequestForm } from "@/components/add-maintenance-request-form"

export default function AddMaintenanceRequestPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Link href="/maintenance" className="text-sm text-muted-foreground hover:text-primary">
              Maintenance
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">New Maintenance Request</span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <AddMaintenanceRequestForm />
      </div>
    </div>
  )
}

