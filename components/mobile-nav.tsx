"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, Home, HelpCircle, Info, CuboidIcon as Cube } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon?: React.ReactNode
  description?: string
}

const navItems: NavItem[] = [
  {
    title: "Products",
    href: "/",
    icon: <Home className="h-4 w-4" />,
    description: "Browse our collection"
  },
  {
    title: "How It Works",
    href: "/how-it-works",
    icon: <HelpCircle className="h-4 w-4" />,
    description: "Learn about AR shopping"
  },
  {
    title: "About",
    href: "/about",
    icon: <Info className="h-4 w-4" />,
    description: "Our story and mission"
  },
  {
    title: "3D Testing",
    href: "/test-responsive",
    icon: <Cube className="h-4 w-4" />,
    description: "Test responsive 3D models"
  }
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile nav when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>      <SheetContent side="left" className="pr-0 pl-0">
        {/* Visually hidden title for screen reader accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        
        <div className="px-6 py-4">
          <Link
            href="/"
            className="flex items-start"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-500 text-transparent bg-clip-text">
              LightAR
            </span>
          </Link>
        </div>
        
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 px-6">          <div className="flex flex-col space-y-2 items-start">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <div className="flex flex-col items-start">
                  <span>{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600">
              Get Started
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
