"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Notifications } from "@/components/notifications"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          {user ? <span>Welcome, {user.name}</span> : <span>Welcome</span>}
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Sidebar />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Notifications />
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

