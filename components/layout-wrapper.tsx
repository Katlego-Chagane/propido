"use client"

import { useAuth } from "@/components/auth-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import type React from "react" // Added import for React
import { cn } from "@/lib/utils"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 bg-background" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

