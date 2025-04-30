"use client"

import { useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import type * as THREE from "three"

interface MiniModelViewerProps {
  modelPath: string
  className?: string
}

export default function MiniModelViewer({ modelPath, className = "" }: MiniModelViewerProps) {
  return (
    <div className={`w-full h-[200px] bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <MiniModel modelPath={modelPath} />

          <Environment preset="apartment" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={2} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate={true} autoRotateSpeed={3} />
      </Canvas>
    </div>
  )
}

function MiniModel({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (modelRef.current) {
      // Position and scale the model appropriately for better visibility
      modelRef.current.scale.set(1.5, 1.5, 1.5)
      modelRef.current.position.set(0, -0.5, 0)
      modelRef.current.rotation.set(0, Math.PI / 4, 0) // Rotate to show a good angle
    }
  }, [])

  return <primitive ref={modelRef} object={gltf.scene} />
}
