"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, Laptop } from "lucide-react"
import QRCode from "@/components/qr-code"
import DeviceDetector from "@/components/device-detector"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import ARWatermark from "@/components/ar-watermark"

interface ARViewPageProps {
  params: {
    id: string
  }
}

export default function ARViewPage({ params }: ARViewPageProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="container py-8">
      <Link href={`/product/${params.id}`} className="inline-flex items-center text-sm font-medium text-blue-600 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to product
      </Link>

      <DeviceDetector
        mobileContent={<MobileARView productId={params.id} />}
        desktopContent={<DesktopARView productId={params.id} />}
      />
    </div>
  )
}

function MobileARView({ productId }: { productId: string }) {
  // Detect iOS vs Android
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

  useEffect(() => {
    // For iOS devices, we would use AR Quick Look with USDZ files
    if (isIOS) {
      // In a real app, you'd use a USDZ file here with anchor="fixed" parameter
      // For demo purposes, we'll just redirect to the 3D view
      window.location.href = `/product/${productId}/3d`
    } else {
      // For Android, we use Scene Viewer with GLB files
      // Add the 'mode=ar_preferred&resizable=false&disable_occlusion=true' parameters to keep model fixed
      const modelUrlWithOrigin = `${window.location.origin}/models/track-spot.glb`
      window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${modelUrlWithOrigin}&mode=ar_preferred&resizable=false&disable_occlusion=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${window.location.origin}/product/${productId}/3d;end;`
    }
  }, [isIOS, productId])

  return (
    <WavyBackground className="max-w-4xl mx-auto py-12" colors={["#6366f1", "#8b5cf6", "#d946ef"]}>
      <div className="flex flex-col items-center justify-center py-12">
        <Smartphone className="h-16 w-16 text-white mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-white">Launching AR Viewer</h1>
        <p className="text-center text-white/80 mb-6">
          The AR viewer should launch automatically. If it doesn't, your device may not support AR viewing.
        </p>
        <Button asChild variant="secondary">
          <Link href={`/product/${productId}/3d`}>View 3D Model Instead</Link>
        </Button>
      </div>
      <ARWatermark position="bottom-right" size="medium" />
    </WavyBackground>
  )
}

function DesktopARView({ productId }: { productId: string }) {
  return (
    <WavyBackground className="max-w-4xl mx-auto py-12" colors={["#6366f1", "#8b5cf6", "#d946ef"]}>
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12">
        <Laptop className="h-16 w-16 text-white mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-white">Scan with your phone to view in AR</h1>
        <p className="text-white/80 mb-8">
          Use your smartphone's camera to scan the QR code below. This will open an AR viewer on your phone where you
          can see this product in your space.
        </p>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <QRCode
            value={`${typeof window !== "undefined" ? window.location.origin : ""}/product/${productId}/ar`}
            size={250}
          />
          <p className="mt-4 font-medium">Scan to view in AR</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="secondary">
            <Link href={`/product/${productId}`}>Back to Product Details</Link>
          </Button>
          <Button asChild>
            <Link href={`/product/${productId}/3d`}>View 3D Model Instead</Link>
          </Button>
        </div>
      </div>
    </WavyBackground>
  )
}
