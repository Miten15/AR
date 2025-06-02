"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Scan } from "lucide-react"
import ModelViewer from "@/components/model-viewer"
import { useEffect, useState, use } from "react"
import RelatedProducts from "@/components/related-products"
import { ProductService } from "@/lib/services/product-service"
import { Product } from "@/lib/data/products"

interface ThreeDViewPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ThreeDViewPage({ params }: ThreeDViewPageProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = use(params)

  useEffect(() => {
    setIsMounted(true)
    
    const initializeComponent = async () => {
      try {
        // Get product data
        const fetchedProduct = await ProductService.getProduct(id)
        setProduct(fetchedProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    
    initializeComponent()
  }, [id])

  if (!isMounted) {
    return null
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6 w-48"></div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-8 bg-gray-300 rounded mb-4 w-64"></div>
            <div className="h-4 bg-gray-300 rounded mb-6 w-full"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/product/${id}`} className="inline-flex items-center text-sm font-medium text-blue-600">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to product
        </Link>
        <Button variant="outline" asChild>
          <Link href={`/product/${id}/ar`}>
            <Scan className="mr-2 h-4 w-4" /> View in AR
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{product.name} - 3D View</h1>
        <p className="text-muted-foreground mb-6">
          Interact with the 3D model by dragging to rotate, scrolling to zoom, and right-clicking to pan. The model will
          automatically rotate to give you a complete view.
        </p>

        {product.modelPath ? (
          <ModelViewer modelPath={product.modelPath} autoRotate showWatermark={true} />
        ) : (
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">3D model not available for this product</p>
          </div>
        )}
      </div>

      <RelatedProducts currentProductId={id} />
    </div>
  )
}
