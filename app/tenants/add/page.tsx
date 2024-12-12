import Link from "next/link"
import { AddTenantForm } from "@/components/add-tenant-form"

export default function AddTenantPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Link href="/tenants" className="text-sm text-muted-foreground hover:text-primary">
              Tenants
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">Add New Tenant</span>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <AddTenantForm />
      </div>
    </div>
  )
}

