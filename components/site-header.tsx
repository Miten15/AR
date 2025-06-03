"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  { title: "Products", href: "/" },
  { title: "How It Works", href: "/how-it-works" },
  { title: "About", href: "/about" }
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        scrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
          : "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40"
      )}
    >
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-foreground/80 hover:bg-accent/50",
                  pathname === item.href
                    ? "text-foreground bg-accent/70"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-sm px-3 md:px-4"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
