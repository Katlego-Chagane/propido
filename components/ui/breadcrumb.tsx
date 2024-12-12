import * as React from "react"
import Link from "next/link"
import { ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
  children: React.ReactNode
}

export function Breadcrumb({ separator = <ChevronRight className="h-4 w-4" />, children, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">{children}</ol>
    </nav>
  )
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"div"> {
  href?: string
  children: React.ReactNode
}

export function BreadcrumbItem({ href, children, className, ...props }: BreadcrumbItemProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      {href ? (
        <Link href={href} className="text-muted-foreground hover:text-foreground">
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </div>
  )
}

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode
}

export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)} aria-hidden="true" {...props}>
      {children || <ChevronRight className="h-4 w-4" />}
    </div>
  )
}

export const BreadcrumbLink = ({ href, children, ...props }: BreadcrumbItemProps) => (
  <BreadcrumbItem {...props}>
    {href ? (
      <Link href={href} className="text-muted-foreground hover:text-foreground">
        {children}
      </Link>
    ) : (
      <span>{children}</span>
    )}
  </BreadcrumbItem>
)
export const BreadcrumbPage = ({ children, ...props }: Omit<BreadcrumbItemProps, 'href'>) => (
  <BreadcrumbItem {...props}>{children}</BreadcrumbItem>
)
export { Breadcrumb as BreadcrumbList }

