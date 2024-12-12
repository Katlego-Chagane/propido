"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HomeIcon, BuildingIcon, UsersIcon, WrenchIcon, FileTextIcon, Eye } from 'lucide-react'
import { WorkspaceSelector } from "@/components/workspace-selector"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", icon: HomeIcon, label: "Dashboard" },
    { href: "/properties", icon: BuildingIcon, label: "Properties" },
    { href: "/tenants", icon: UsersIcon, label: "Tenants" },
    { href: "/maintenance", icon: WrenchIcon, label: "Maintenance" },
    { href: "/lease-agreements", icon: FileTextIcon, label: "Lease Agreements" },
    { href: "/screening", icon: Eye, label: "Screening", badge: "Next" },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    if (href === "/screening") {
      return false
    }
    return pathname.startsWith(href)
  }

  return (
    <div className={cn("flex flex-col h-full border-r bg-gray-900 text-white", className)}>
      <div className="p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/propido%20320%20by%2086-04wdHCBl1vTUvJ4n8hl4pd9s06y4N4.png"
            alt="Propido"
            width={160}
            height={43}
            className="h-auto w-auto"
            priority
          />
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          <div className="px-4">
            <WorkspaceSelector />
          </div>
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Menu
            </h2>
            <div className="space-y-1">
              {menuItems.map((item) => (
                item.href === "/screening" ? (
                  <div
                    key={item.href}
                    className={cn(
                      "w-full flex items-center justify-between py-2 px-3 text-white mb-1 hover:bg-gray-800",
                      isActive(item.href) && "bg-gray-800"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-600 text-white px-1.5 py-0.5 text-[10px]"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Button
                    key={item.href}
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-white mb-1",
                      isActive(item.href) ? "bg-gray-800" : "hover:bg-blue-600/20 hover:text-blue-400"
                    )}
                    asChild
                  >
                    <Link href={item.href} className="flex w-full items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

