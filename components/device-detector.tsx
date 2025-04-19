"use client"

import { useEffect, useState, type ReactNode } from "react"

interface DeviceDetectorProps {
  mobileContent: ReactNode
  desktopContent: ReactNode
}

export default function DeviceDetector({ mobileContent, desktopContent }: DeviceDetectorProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      setIsMobile(isMobileDevice)
    }

    checkDevice()

    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  if (!isClient) {
    // Return a placeholder or loading state
    return <div className="py-12 text-center">Loading...</div>
  }

  return isMobile ? mobileContent : desktopContent
}
