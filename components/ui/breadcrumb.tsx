import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/my-app/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
  children: React.ReactNode
  activeItem?: string
}

export function Breadcrumb({
  separator = <ChevronRight className="h-4 w-4" />,
  children,
  className,
  activeItem,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === BreadcrumbPage) {
            return React.cloneElement(child, {
              isActive: child.props.children === activeItem,
            })
          }
          return child
        })}
      </ol>
    </nav>
  )
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"div"> {
  href?: string | React.ReactElement
  children: React.ReactNode
}

export function BreadcrumbItem({ href, children, className, ...props }: BreadcrumbItemProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      {typeof href === "string" ? (
        <Link href={href} className="text-muted-foreground hover:text-foreground">
          {children}
        </Link>
      ) : (
        href || children
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

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(({ href, children, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  return (
    <BreadcrumbItem>
      <Comp ref={ref} href={href} className="text-muted-foreground hover:text-foreground" {...props}>
        {children}
      </Comp>
    </BreadcrumbItem>
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

export const BreadcrumbPage = ({
  children,
  isActive,
  ...props
}: Omit<BreadcrumbItemProps, "href"> & { isActive?: boolean }) => (
  <BreadcrumbItem {...props}>
    <span className={cn("font-semibold", isActive && "text-blue-600 dark:text-blue-400")}>{children}</span>
  </BreadcrumbItem>
)
export { Breadcrumb as BreadcrumbList }

