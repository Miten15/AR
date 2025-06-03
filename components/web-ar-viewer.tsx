"use client"

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Camera, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  X,
  Loader2,
  Info
} from 'lucide-react'
import { Product } from '@/lib/data/products'

interface WebARViewerProps {
  product: Product
  onClose: () => void
}

export default function WebARViewer({ product, onClose }: WebARViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [arStarted, setArStarted] = useState(false)
  const [instructions, setInstructions] = useState(true)
  const aframeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically load A-Frame and AR.js
    const loadAFrameAndAR = async () => {
      try {
        // Load A-Frame
        if (!document.querySelector('script[src*="aframe"]')) {
          const aframeScript = document.createElement('script')
          aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
          document.head.appendChild(aframeScript)
          
          await new Promise((resolve) => {
            aframeScript.onload = resolve
          })
        }

        // Load AR.js
        if (!document.querySelector('script[src*="ar.js"]')) {
          const arScript = document.createElement('script')
          arScript.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.min.js'
          document.head.appendChild(arScript)
          
          await new Promise((resolve) => {
            arScript.onload = resolve
          })
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load AR libraries:', error)
        setIsLoading(false)
      }
    }

    loadAFrameAndAR()
  }, [])

  const startAR = () => {
    setArStarted(true)
    setInstructions(false)
    
    // Initialize A-Frame AR scene
    if (aframeRef.current) {
      aframeRef.current.innerHTML = `
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
          style="width: 100%; height: 100%;"
        >
          <!-- Marker-based AR -->
          <a-marker preset="hiro">
            <a-entity
              gltf-model="${product.modelPath}"
              scale="0.5 0.5 0.5"
              position="0 0 0"
              rotation="0 0 0"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear;"
            ></a-entity>
          </a-marker>
          
          <!-- Markerless AR fallback -->
          <a-entity
            gltf-model="${product.modelPath}"
            scale="0.1 0.1 0.1"
            position="0 0 -1"
            rotation="0 0 0"
            id="ar-model"
            visible="false"
          ></a-entity>
          
          <a-entity camera></a-entity>
        </a-scene>
      `
    }
  }
  const toggleMarkerlessMode = () => {
    const model = document.querySelector('#ar-model')
    if (model) {
      const isVisible = model.getAttribute('visible') === 'true'
      model.setAttribute('visible', (!isVisible).toString())
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold mb-2">Loading Web AR</h3>
          <p className="text-white/80">Initializing camera and AR libraries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* AR Scene Container */}
      <div className="relative w-full h-full">
        <div 
          ref={aframeRef} 
          className="w-full h-full"
          style={{ display: arStarted ? 'block' : 'none' }}
        />
        
        {/* Instructions Overlay */}
        {instructions && !arStarted && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-white text-center max-w-md mx-4">
              <Camera className="w-16 h-16 mx-auto mb-6 text-blue-400" />
              <h2 className="text-2xl font-bold mb-4">Web AR Experience</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <p>Allow camera access when prompted</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <p>Point camera at a flat surface</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <p>Tap "Place Model" to position the {product.name}</p>
                </div>
              </div>
              <Button onClick={startAR} className="w-full mt-6" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Start AR Experience
              </Button>
            </div>
          </div>
        )}

        {/* AR Controls */}
        {arStarted && (
          <>
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-white/80">Point camera at surface to place</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={toggleMarkerlessMode}
                >
                  <Move className="w-4 h-4 mr-1" />
                  Place Model
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    const model = document.querySelector('#ar-model')
                    if (model) {
                      model.setAttribute('rotation', '0 0 0')
                    }
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Info Panel */}
            <div className="absolute top-20 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Tips:</p>
                  <ul className="text-xs space-y-1 text-white/80">
                    <li>• Move slowly for better tracking</li>
                    <li>• Use good lighting</li>
                    <li>• Point at textured surfaces</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
