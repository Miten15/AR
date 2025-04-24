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
          console.error("Product not found", productId);
          // Fallback to default model if product not found
          setModelPath("/models/track-spot.glb")
          return
        }
        
        const product: Product = await response.json()
        console.log("Loaded model path:", product.modelPath, "for product:", productId);
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
  
  // Clear the cache for the model to ensure we load the correct one
  useGLTF.preload(modelPath)
  const { scene } = useGLTF(modelPath, true) // Force reload with true
  
  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]} 
      key={`${productId}-${modelPath}`} // Better key to force re-render
    />
  )
}
