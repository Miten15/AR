"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ARWatermarkProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size?: "small" | "medium" | "large"
}

export default function ARWatermark({ position = "bottom-right", size = "medium" }: ARWatermarkProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in the watermark after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Determine position classes
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  // Determine size classes
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 transition-opacity duration-500 ${isVisible ? "opacity-80" : "opacity-0"}`}
    >
      <div className={`relative ${sizeClasses[size]}`}>
        <Image src="/images/true-logo.svg" alt="TRUE LED LIGHTS" fill className="object-contain" />
      </div>
    </div>
  )
}
