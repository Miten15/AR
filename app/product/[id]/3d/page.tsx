"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Scan } from "lucide-react"
import ModelViewer from "@/components/model-viewer"
import { useEffect, useState } from "react"
import RelatedProducts from "@/components/related-products"

interface ThreeDViewPageProps {
  params: {
    id: string
  }
}

export default function ThreeDViewPage({ params }: ThreeDViewPageProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/product/${params.id}`} className="inline-flex items-center text-sm font-medium text-blue-600">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to product
        </Link>
        <Button variant="outline" asChild>
          <Link href={`/product/${params.id}/ar`}>
            <Scan className="mr-2 h-4 w-4" /> View in AR
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Track Spot Light - 3D View</h1>
        <p className="text-muted-foreground mb-6">
          Interact with the 3D model by dragging to rotate, scrolling to zoom, and right-clicking to pan. The model will
          automatically rotate to give you a complete view.
        </p>

        <ModelViewer modelPath="/models/track-spot.glb" autoRotate showWatermark={true} />
      </div>

      <RelatedProducts currentProductId={params.id} />
    </div>
  )
}
