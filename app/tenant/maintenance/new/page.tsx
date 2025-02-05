import { TenantMaintenanceForm } from "@/components/tenant-maintenance-form"

export default function NewTenantMaintenanceRequestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">New Maintenance Request</h1>
      <TenantMaintenanceForm />
    </div>
  )
}

