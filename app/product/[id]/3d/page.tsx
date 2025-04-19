"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Scan } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, ContactShadows } from "@react-three/drei"
import Model from "@/components/model"

interface ThreeDViewPageProps {
  params: {
    id: string
  }
}

export default function ThreeDViewPage({ params }: ThreeDViewPageProps) {
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

      <div className="w-full h-[calc(100vh-200px)] min-h-[500px] bg-gray-50 rounded-lg overflow-hidden">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
            >
              <Model productId={params.id} />
            </PresentationControls>
            <Environment preset="apartment" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={2} />
          </Suspense>
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Canvas>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-2">Track Spot Light - 3D View</h1>
        <p className="text-muted-foreground">
          Interact with the 3D model by dragging to rotate, scrolling to zoom, and right-clicking to pan.
        </p>
      </div>
    </div>
  )
}
