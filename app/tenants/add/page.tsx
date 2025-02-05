import Link from "next/link"
import { AddTenantForm } from "@/components/add-tenant-form"

export default function AddTenantPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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
      <div className="w-full max-w-3xl mx-auto">
        <AddTenantForm />
      </div>
    </div>
  )
}

