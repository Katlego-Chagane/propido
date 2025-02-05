"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HomeIcon, BuildingIcon, UsersIcon, WrenchIcon, FileTextIcon } from "lucide-react"
import { WorkspaceSelector } from "@/components/workspace-selector"
import Image from "next/image"
import type React from "react" // Import React

const landlordMenuItems = [
  { href: "/dashboard", icon: HomeIcon, label: "Dashboard" },
  { href: "/properties", icon: BuildingIcon, label: "Properties" },
  { href: "/tenants", icon: UsersIcon, label: "Tenants" },
  { href: "/maintenance", icon: WrenchIcon, label: "Maintenance" },
  { href: "/lease-agreements", icon: FileTextIcon, label: "Lease Agreements" },
]

const tenantMenuItems = [
  { href: "/property/tenant/[id]", icon: HomeIcon, label: "Dashboard" },
  { href: "/property/tenant/[id]/maintenance", icon: WrenchIcon, label: "Maintenance" },
  { href: "/property/tenant/[id]/lease", icon: FileTextIcon, label: "Lease" },
]

const isActive = (href: string, pathname: string) => {
  if (href.includes("[id]")) {
    // Extract the base path without the ID
    const baseHref = href.split("/").slice(0, -1).join("/")
    const basePathname = pathname.split("/").slice(0, -1).join("/")

    // For maintenance and lease pages, check if they're exactly matched
    if (href.includes("maintenance") || href.includes("lease")) {
      return pathname.startsWith(basePathname)
    }

    // For other pages, check if the base paths match
    return basePathname === baseHref
  }
  return pathname.startsWith(href)
}

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  const isTenant = pathname.startsWith("/property/tenant/")
  const menuItems = isTenant ? tenantMenuItems : landlordMenuItems

  return (
    <div className={cn("flex flex-col h-full border-r bg-background", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/propido%20320%20by%2086-04wdHCBl1vTUvJ4n8hl4pd9s06y4N4.png"
            alt="Propido"
            width={160}
            height={43}
            className="h-auto w-auto"
            priority
          />
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          {!isTenant && (
            <div className="px-4 py-2">
              <WorkspaceSelector />
            </div>
          )}
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Menu</h2>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const href = isTenant ? item.href.replace("[id]", pathname.split("/")[3]) : item.href
                return (
                  <Button
                    key={item.href}
                    variant={isActive(item.href, pathname) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive(item.href, pathname) ? "bg-secondary" : "hover:bg-accent hover:text-accent-foreground",
                    )}
                    asChild
                  >
                    <Link href={href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

