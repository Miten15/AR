"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, Laptop } from "lucide-react"
import QRCode from "@/components/qr-code"
import DeviceDetector from "@/components/device-detector"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { useParams } from "next/navigation"

export default function ARViewPage() {
  const [isMounted, setIsMounted] = useState(false)
  // Get the product ID using useParams hook instead of the params prop
  const params = useParams()
  const productId = Array.isArray(params.id) ? params.id[0] : params.id as string

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="container py-8">
      <Link href={`/product/${productId}`} className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to product
      </Link>

      <DeviceDetector
        mobileContent={<MobileARView productId={productId} />}
        desktopContent={<DesktopARView productId={productId} />}
      />
    </div>
  )
}

function MobileARView({ productId }: { productId: string }) {
  // In a real app, you would determine the correct AR viewer URL based on the device
  // For iOS: AR Quick Look (.usdz files)
  // For Android: Scene Viewer (.glb files)

  // This is a simplified example - in a real app, you'd have both USDZ and GLB files
  const modelUrl = `/models/track-spot.glb`

  // Detect iOS vs Android
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

  useEffect(() => {
    // For iOS devices, we would use AR Quick Look with USDZ files
    if (isIOS) {
      // In a real app, you'd use a USDZ file here
      // For demo purposes, we'll just redirect to the 3D view
      window.location.href = `/product/${productId}/3d`
    } else {
      // For Android, we use Scene Viewer with GLB files
      const modelUrlWithOrigin = `${window.location.origin}${modelUrl}`
      window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${modelUrlWithOrigin}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${window.location.origin}/product/${productId}/3d;end;`
    }
  }, [isIOS, modelUrl, productId])

  return (
    <WavyBackground className="max-w-4xl mx-auto py-12" colors={["#3b82f6", "#8b5cf6", "#d946ef"]} waveOpacity={0.3}>
      <div className="flex flex-col items-center justify-center py-12">
        <Smartphone className="h-16 w-16 text-blue-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-white">Launching AR Viewer</h1>
        <p className="text-center text-slate-300 mb-6">
          The AR viewer should launch automatically. If it doesn't, your device may not support AR viewing.
        </p>
        <Button asChild variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-200">
          <Link href={`/product/${productId}/3d`}>View 3D Model Instead</Link>
        </Button>
      </div>
    </WavyBackground>
  )
}

function DesktopARView({ productId }: { productId: string }) {
  return (
    <WavyBackground className="max-w-4xl mx-auto py-12" colors={["#3b82f6", "#8b5cf6", "#d946ef"]} waveOpacity={0.3}>
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12">
        <Laptop className="h-16 w-16 text-blue-400 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-white">Scan with your phone to view in AR</h1>
        <p className="text-slate-300 mb-8">
          Use your smartphone's camera to scan the QR code below. This will open an AR viewer on your phone where you
          can see this product in your space.
        </p>

        <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl shadow-lg mb-8">
          <div className="bg-white p-4 rounded-lg">
            <QRCode
              value={`${typeof window !== "undefined" ? window.location.origin : ""}/product/${productId}/ar`}
              size={250}
            />
          </div>
          <p className="mt-4 font-medium text-slate-200">Scan to view in AR</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-200">
            <Link href={`/product/${productId}`}>Back to Product Details</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600">
            <Link href={`/product/${productId}/3d`}>View 3D Model Instead</Link>
          </Button>
        </div>
      </div>
    </WavyBackground>
  )
}
