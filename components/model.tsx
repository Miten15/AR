"use client"

import { useGLTF } from "@react-three/drei"
import { useEffect, useState } from "react"
import type { Group } from "three"

interface ModelProps {
  productId?: string
}

export default function Model({ productId }: ModelProps) {
  // Use the provided 3D model
  const { scene } = useGLTF("/models/track-spot.glb")
  const [model, setModel] = useState<Group | null>(null)

  useEffect(() => {
    if (scene) {
      const newScene = scene.clone()

      // Position and scale the model appropriately
      newScene.scale.set(1, 1, 1)
      newScene.position.set(0, -0.5, 0)
      newScene.rotation.set(0, Math.PI / 4, 0) // Rotate to show a good angle

      setModel(newScene)
    }
  }, [scene, productId])

  if (!model) return null

  return <primitive object={model} />
}
