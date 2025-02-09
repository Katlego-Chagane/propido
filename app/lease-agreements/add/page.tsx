import Link from "next/link"
import { AddLeaseAgreementForm } from "@/components/add-lease-agreement-form"

export default function AddLeaseAgreementPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Link href="/lease-agreements" className="text-sm text-muted-foreground hover:text-primary">
                Lease Agreements
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm">Add New Lease Agreement</span>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <AddLeaseAgreementForm />
        </div>
      </div>
    </div>
  )
}

