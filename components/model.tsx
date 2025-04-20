"use client"

import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { Product } from "@/data/products"

interface ModelProps {
  productId: string
}

export default function Model({ productId }: ModelProps) {
  const [modelPath, setModelPath] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/products/${productId}`)
        
        if (!response.ok) {
          // Fallback to default model if product not found
          setModelPath("/models/track-spot.glb")
          return
        }
        
        const product: Product = await response.json()
        setModelPath(product.modelPath)
      } catch (error) {
        console.error("Error fetching product:", error)
        // Fallback to default model on error
        setModelPath("/models/track-spot.glb")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProduct()
  }, [productId])
  
  // Don't try to load until we have a path
  if (!modelPath) return null
  
  // Dynamic model loading based on product ID
  // Add cache busting by adding a query parameter with the product ID
  const { scene } = useGLTF(`${modelPath}?id=${productId}`)
  
  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]} 
      key={productId} // Add a key to force re-render when product changes
    />
  )
}
