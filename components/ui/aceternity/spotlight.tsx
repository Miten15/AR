"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useState, useEffect } from "react"

interface SpotlightProps {
  className?: string
  children?: React.ReactNode
}

export const Spotlight = ({ children, className = "" }: SpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mousePositionRef.current = { x, y }

      if (container) {
        container.style.setProperty("--x", `${x}px`)
        container.style.setProperty("--y", `${y}px`)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden bg-slate-950", className)}
      style={
        {
          "--x": "0px",
          "--y": "0px",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(59,130,246,0.15)_0%,transparent_80%)]"
        style={{
          opacity: isMounted ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {children}
    </div>
  )
}
