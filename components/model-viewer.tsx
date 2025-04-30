"use client"

import { useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import type * as THREE from "three"
import ARWatermark from "./ar-watermark"

interface ModelViewerProps {
  modelPath: string
  className?: string
  zoom?: number
  autoRotate?: boolean
  showWatermark?: boolean
}

export default function ModelViewer({
  modelPath,
  className = "",
  zoom = 2.5,
  autoRotate = false,
  showWatermark = false,
}: ModelViewerProps) {
  return (
    <div className={`w-full h-[calc(100vh-200px)] min-h-[500px] bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      <Canvas shadows camera={{ position: [0, 0, zoom], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Model modelPath={modelPath} />
          </PresentationControls>

          <Environment preset="apartment" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={2} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          minDistance={1.5}
          maxDistance={8}
        />
      </Canvas>

      {showWatermark && <ARWatermark position="bottom-right" size="medium" />}
    </div>
  )
}

function Model({ modelPath }: { modelPath: string }) {
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
