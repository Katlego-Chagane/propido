import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is for tenant routes
  const isTenantPath = path.startsWith("/property/tenant/")

  // For this example, we'll use a dummy check. In a real app, you'd verify the user's role from a token or session.
  const userRole = request.cookies.get("user_role")?.value

  if (isTenantPath && userRole !== "tenant") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!isTenantPath && userRole === "tenant") {
    // Assuming we have a tenantId stored in the user's session or token
    const tenantId = request.cookies.get("tenant_id")?.value || "default"
    return NextResponse.redirect(new URL(`/property/tenant/${tenantId}`, request.url))
  }

  if (!isTenantPath && userRole !== "landlord") {
    return NextResponse.redirect(new URL("/tenant/dashboard", request.url))
  }

  const token = request.cookies.get('auth-token') // Adjust based on your auth token storage

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/properties/:path*",
    "/tenants/:path*",
    "/maintenance/:path*",
    "/lease-agreements/:path*",
    "/property/tenant/:path*",
  ],
}

