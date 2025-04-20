"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Scan } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, ContactShadows } from "@react-three/drei"
import Model from "@/components/model"
import { useParams } from "next/navigation"
import { getProductById } from "@/data/products"

export default function ThreeDViewPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id as string
  
  // Make sure the component is mounted before rendering the canvas
  const [isMounted, setIsMounted] = useState(false)
  const [productName, setProductName] = useState("Product")
  
  useEffect(() => {
    setIsMounted(true)
    const product = getProductById(id)
    if (product) {
      setProductName(product.name)
    }
  }, [id])
  
  if (!isMounted) {
    return (
      <div className="container py-8">
        <div className="w-full h-[calc(100vh-200px)] min-h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
          <p>Loading 3D model...</p>
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

      <div className="w-full h-[calc(100vh-200px)] min-h-[500px] bg-gray-50 rounded-lg overflow-hidden">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              speed={1.5}
              zoom={0.5}
              snap={true}
            >
              <Model productId={id} />
            </PresentationControls>
            <Environment preset="apartment" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={2} />
          </Suspense>
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Canvas>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-2">{productName} - 3D View</h1>
        <p className="text-muted-foreground">
          Interact with the 3D model by dragging to rotate, scrolling to zoom, and right-clicking to pan.
        </p>
      </div>
    </div>
  )
}
