"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

export interface NavItem {
  title: string
  href: string
  description?: string
}

interface NavbarProps {
  items?: NavItem[]
  showCTA?: boolean
  ctaText?: string
  ctaHref?: string
  variant?: "default" | "transparent" | "solid"
  className?: string
}

const defaultNavItems: NavItem[] = [
  { title: "Products", href: "/", description: "Browse our collection" },
  { title: "How It Works", href: "/how-it-works", description: "Learn about AR shopping" },
  { title: "About", href: "/about", description: "Our story and mission" }
]

export function Navbar({ 
  items = defaultNavItems,
  showCTA = true,
  ctaText = "Get Started",
  ctaHref = "/#products",
  variant = "default",
  className
}: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getNavbarClasses = () => {
    const baseClasses = "sticky top-0 z-50 w-full border-b transition-all duration-200"
    
    switch (variant) {
      case "transparent":
        return cn(
          baseClasses,
          scrolled 
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
            : "bg-transparent backdrop-blur supports-[backdrop-filter]:bg-background/20"
        )
      case "solid":
        return cn(baseClasses, "bg-background shadow-sm")
      default:
        return cn(
          baseClasses,
          scrolled 
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
            : "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40"
        )
    }
  }

  return (
    <header className={cn(getNavbarClasses(), className)}>
      <div className="container">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <MobileNav />
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-violet-500 text-transparent bg-clip-text">
                LightAR
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-foreground/80 hover:bg-accent/50",
                  pathname === item.href
                    ? "text-foreground bg-accent/70"
                    : "text-foreground/60"
                )}
                title={item.description}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          {showCTA && (
            <div className="flex items-center space-x-2">
              <Button 
                asChild
                variant="default" 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-sm px-3 md:px-4"
              >
                <Link href={ctaHref}>
                  <span className="hidden sm:inline">{ctaText}</span>
                  <span className="sm:hidden">{ctaText.split(' ')[0]}</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
