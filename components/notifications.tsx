"use client"

import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from 'next/link'
import { cn } from "@/lib/utils"

const notifications = [
  { id: 1, message: "New maintenance request submitted", isRead: false, link: "/maintenance", date: new Date(2023, 11, 1, 9, 30) },
  { id: 2, message: "Rent payment due in 3 days", isRead: false, link: "/payments", date: new Date(2023, 11, 2, 14, 15) },
  { id: 3, message: "Lease expiring next month", isRead: true, link: "/leases", date: new Date(2023, 11, 3, 11, 0) },
  { id: 4, message: "Announcement: Building maintenance scheduled for next week", isRead: false, link: "/announcements", date: new Date(2023, 11, 4, 16, 45) },
]

export function Notifications() {
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.isRead).length)

  const markAsRead = (id: number) => {
    setUnreadCount(prev => Math.max(0, prev - 1))
    // In a real app, you'd update the notification status in your backend here
  }

  const clearAllNotifications = () => {
    setUnreadCount(0)
    // In a real app, you'd clear the notifications in your backend here
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex justify-between items-center p-2 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" onClick={clearAllNotifications}>Clear all</Button>
        </div>
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} asChild>
            <Link href={notification.link} className="flex justify-between items-center py-2 px-4">
              <span 
                className={cn(
                  "flex-1 mr-4",
                  notification.isRead ? "text-muted-foreground" : "font-medium"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                {notification.message}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {notification.date.toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: 'numeric', 
                  minute: 'numeric' 
                })}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

