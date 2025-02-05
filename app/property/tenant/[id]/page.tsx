import { TenantDashboard } from "@/components/tenant-dashboard"

export default function TenantDashboardPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <TenantDashboard tenantId={params.id} />
    </div>
  )
}

