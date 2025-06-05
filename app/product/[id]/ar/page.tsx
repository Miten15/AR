"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, Laptop, Camera, QrCode } from "lucide-react"
import QRCode from "@/components/qr-code"
import DeviceDetector from "@/components/device-detector"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import ARWatermark from "@/components/ar-watermark"
import EnhancedARViewer from "@/components/enhanced-ar-viewer"
import WebARViewer from "@/components/web-ar-viewer"
import { ProductService } from "@/lib/services/product-service"
import { Product } from "@/lib/data/products"
import { arCapabilityDetector } from "@/lib/utils/ar-capabilities"
import { notFound } from "next/navigation"

interface ARViewPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ARViewPage({ params }: ARViewPageProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [showWebAR, setShowWebAR] = useState(false)
  const { id } = use(params)

  useEffect(() => {
    setIsMounted(true)
    // Load model-viewer script
    if (!document.querySelector('script[type="module"][src*="model-viewer"]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
      document.head.appendChild(script)
    }

    // Fetch product data
    const fetchProduct = async () => {
      try {
        const productData = await ProductService.getProduct(id)
        if (!productData) {
          notFound()
        }
        setProduct(productData)
      } catch (error) {
        console.error("Error fetching product:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])
  if (!isMounted || loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AR viewer...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <>
      {/* Web AR Viewer Modal */}
      {showWebAR && (
        <WebARViewer 
          product={product} 
          onClose={() => setShowWebAR(false)} 
        />
      )}
      
      <div className="container py-8">
        <Link href={`/product/${id}`} className="inline-flex items-center text-sm font-medium text-blue-600 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to product
        </Link>
        
        <DeviceDetector
          mobileContent={<MobileARView productId={id} product={product} onShowWebAR={() => setShowWebAR(true)} />}
          desktopContent={<DesktopARView productId={id} product={product} />}
        />
      </div>
    </>
  )
}

function MobileARView({ productId, product, onShowWebAR }: { 
  productId: string; 
  product: Product;
  onShowWebAR: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Enhanced AR Viewer */}
      <EnhancedARViewer product={product} productId={productId} />
      
      {/* Alternative Web AR Option */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-2">Having trouble with AR?</h3>
        <p className="text-gray-600 mb-4">
          Try our web-based AR viewer that works on more devices
        </p>
        <Button onClick={onShowWebAR} variant="outline" className="w-full">
          <Camera className="w-4 h-4 mr-2" />
          Open Web AR Viewer
        </Button>
      </div>
      
      <ARWatermark position="bottom-right" size="medium" />
    </div>
  )
}

function DesktopARView({ productId, product }: { productId: string; product: Product }) {
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
