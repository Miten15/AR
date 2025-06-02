"use client"

import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import * as THREE from "three"
import { applyModelNormalization, detectModelCharacteristics, getResponsiveModelSettings, ResponsiveMiniViewerSettings } from "@/lib/utils/model-normalizer"

interface MiniModelViewerProps {
  modelPath: string
  className?: string
}

// Hook for responsive mini viewer settings
function useResponsiveMiniSettings(): ResponsiveMiniViewerSettings {
  const [settings, setSettings] = useState<ResponsiveMiniViewerSettings>(getResponsiveModelSettings(1024, false))

  useEffect(() => {
    const updateSettings = () => {
      setSettings(getResponsiveModelSettings(window.innerWidth, false))
    }

    updateSettings()
    window.addEventListener('resize', updateSettings)
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  return settings
}

export default function MiniModelViewer({ modelPath, className = "" }: MiniModelViewerProps) {
  const responsiveSettings = useResponsiveMiniSettings()
  
  return (
    <div 
      className={`w-full bg-gray-50 rounded-lg overflow-hidden ${className}`}
      style={{ height: `${responsiveSettings.height}px` }}
    >
      <Canvas 
        shadows 
        camera={{ 
          position: [0, 0, responsiveSettings.cameraDistance], 
          fov: responsiveSettings.fov 
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <MiniModel modelPath={modelPath} responsiveSettings={responsiveSettings} />

          <Environment preset="apartment" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={2} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true} 
          autoRotate={true} 
          autoRotateSpeed={responsiveSettings.autoRotateSpeed}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={responsiveSettings.rotateSpeed}
          // Prevent erratic movement
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
    </div>
  )
}

function MiniModel({ modelPath, responsiveSettings }: { modelPath: string, responsiveSettings: ResponsiveMiniViewerSettings }) {
  const gltf = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (modelRef.current && gltf.scene) {
      // Detect model characteristics for optimal settings
      const characteristics = detectModelCharacteristics(gltf.scene)
      
      // Apply Fab.com-style auto-centering and auto-scaling for mini viewer
      applyModelNormalization(modelRef.current, gltf.scene, {
        targetSize: characteristics.suggestedTargetSize * responsiveSettings.targetSizeMultiplier,
        centerModel: true,
        groundModel: true,
        rotationY: characteristics.suggestedRotation,
        fitStrategy: 'fit',
        padding: 0.1
      })
    }
  }, [gltf.scene, modelPath, responsiveSettings])

  if (!gltf.scene) return null

  return <primitive ref={modelRef} object={gltf.scene} />
}

// Preload models for better performance
useGLTF.preload("/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb")
useGLTF.preload("/models/tiffany_lamp.glb")
useGLTF.preload("/models/triple_ceiling_hanging_lamp.glb")
