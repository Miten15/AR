"use client"

import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import * as THREE from "three"
import ARWatermark from "./ar-watermark"
import { applyModelNormalization, detectModelCharacteristics, getResponsiveModelSettings, ResponsiveMainViewerSettings } from "@/lib/utils/model-normalizer"
import { trackModelLoadTime } from "@/lib/utils/performance-monitor"

interface ModelViewerProps {
  modelPath: string
  className?: string
  zoom?: number
  autoRotate?: boolean
  showWatermark?: boolean
}

// Hook to get responsive camera settings based on screen size
function useResponsiveCamera(): ResponsiveMainViewerSettings {
  const [settings, setSettings] = useState<ResponsiveMainViewerSettings>(getResponsiveModelSettings(1024, true))

  useEffect(() => {
    const updateSettings = () => {
      setSettings(getResponsiveModelSettings(window.innerWidth, true))
    }

    updateSettings()
    window.addEventListener('resize', updateSettings)
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  return settings
}

export default function ModelViewer({
  modelPath,
  className = "",
  zoom,
  autoRotate = false,
  showWatermark = false,
}: ModelViewerProps) {
  const responsiveSettings = useResponsiveCamera()
  const finalZoom = zoom || responsiveSettings.zoom
  
  return (
    <div className={`w-full h-[calc(100vh-200px)] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      <Canvas 
        shadows 
        camera={{ 
          position: [0, 0, finalZoom], 
          fov: responsiveSettings.fov 
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Model modelPath={modelPath} responsiveSettings={responsiveSettings} />

          <Environment preset="apartment" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={2} />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={responsiveSettings.autoRotateSpeed}
          minDistance={responsiveSettings.minDistance}
          maxDistance={responsiveSettings.maxDistance}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={responsiveSettings.dampingFactor}
          rotateSpeed={responsiveSettings.rotateSpeed}
          panSpeed={0.8}
          zoomSpeed={0.6}
          // Prevent erratic movement by constraining angles
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.1}
        />
      </Canvas>

      {showWatermark && <ARWatermark position="bottom-right" size="medium" />}
    </div>
  )
}

function Model({ modelPath, responsiveSettings }: { modelPath: string, responsiveSettings: ResponsiveMainViewerSettings }) {
  const gltf = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    const trackLoad = trackModelLoadTime(modelPath, setLoadTime)
    
    if (modelRef.current && gltf.scene) {
      // Detect model characteristics for optimal settings
      const characteristics = detectModelCharacteristics(gltf.scene)
      
      // Apply Fab.com-style auto-centering and auto-scaling with responsive settings
      const result = applyModelNormalization(modelRef.current, gltf.scene, {
        targetSize: characteristics.suggestedTargetSize * responsiveSettings.targetSizeMultiplier,
        centerModel: true,
        groundModel: true,
        rotationY: characteristics.suggestedRotation,
        fitStrategy: 'fit',
        padding: 0.05
      })
      
      console.log(`Model: ${modelPath}`)
      console.log(`Screen width: ${window.innerWidth}px`)
      console.log(`Target size multiplier: ${responsiveSettings.targetSizeMultiplier}`)
      console.log(`Applied scale:`, result.scale)
      console.log(`Load time: ${loadTime.toFixed(2)}ms`)
      
      trackLoad() // Track completion
    }
  }, [gltf.scene, modelPath, responsiveSettings, loadTime])

  if (!gltf.scene) return null

  return <primitive ref={modelRef} object={gltf.scene} />
}

// Preload models for better performance
useGLTF.preload("/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb")
useGLTF.preload("/models/tiffany_lamp.glb")
useGLTF.preload("/models/triple_ceiling_hanging_lamp.glb")
