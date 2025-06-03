"use client"

/// <reference path="../types/model-viewer.d.ts" />

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  Loader2, 
  Camera,
  Maximize,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Download,
  Share2
} from 'lucide-react'
import { arCapabilityDetector, ARCapabilities } from '@/lib/utils/ar-capabilities'
import { Product } from '@/lib/data/products'

interface ARModelViewerProps {
  product: Product
  productId: string
  className?: string
}

export default function ARModelViewer({ product, productId, className = "" }: ARModelViewerProps) {
  const [capabilities, setCapabilities] = useState<ARCapabilities | null>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [arReady, setArReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAR = async () => {
      try {
        // Detect AR capabilities
        const caps = await arCapabilityDetector.detectCapabilities()
        setCapabilities(caps)
        
        // Load model-viewer if not already loaded
        if (!window.customElements.get('model-viewer')) {
          const script = document.createElement('script')
          script.type = 'module'
          script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
          document.head.appendChild(script)
          
          script.onload = () => {
            setArReady(true)
          }
        } else {
          setArReady(true)
        }
      } catch (error) {
        console.error('AR initialization failed:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAR()
  }, [])

  const handleModelLoad = () => {
    setModelLoaded(true)
  }

  const handleARLaunch = async () => {
    if (!capabilities) return

    try {
      const fallbackUrl = `${window.location.origin}/product/${productId}/3d`
      const arUrl = await arCapabilityDetector.getARLaunchUrl(product.modelPath, fallbackUrl)
      
      if (capabilities.recommendedMethod === 'webxr') {
        // Use model-viewer's built-in AR
        const modelViewer = document.querySelector('model-viewer')
        if (modelViewer && (modelViewer as any).activateAR) {
          (modelViewer as any).activateAR()
        }
      } else {
        // Launch external AR
        window.location.href = arUrl
      }
    } catch (error) {
      console.error('Failed to launch AR:', error)
    }
  }

  if (loading || !arReady) {
    return (
      <div className={`relative aspect-square bg-gray-100 rounded-xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Loading AR viewer...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative aspect-square rounded-xl overflow-hidden ${className}`}>
      {/* Model Viewer */}
      <model-viewer
        src={product.modelPath}
        alt={`AR view of ${product.name}`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        auto-rotate-delay="1000"
        rotation-per-second="30deg"
        environment-image="neutral"
        poster={product.image}
        shadow-intensity="1"
        exposure="1"
        loading="eager"
        reveal="auto"
        className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100"
        style={{ 
          width: '100%', 
          height: '100%',
          '--poster-color': '#f3f4f6'
        } as any}
        onLoad={handleModelLoad}
      />

      {/* Overlay Controls */}
      {modelLoaded && (
        <>
          {/* AR Status Badge */}
          <div className="absolute top-4 left-4">
            {capabilities?.canViewAR ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                AR Ready
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Eye className="w-3 h-3 mr-1" />
                3D View
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 max-w-48">
            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
            <p className="text-xs text-gray-600">{product.category}</p>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-center space-x-3">
              {capabilities?.canViewAR && (
                <Button 
                  onClick={handleARLaunch}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  View in AR
                </Button>
              )}
              
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm"
                onClick={() => {
                  const modelViewer = document.querySelector('model-viewer')
                  if (modelViewer) {
                    (modelViewer as any).resetTurntableRotation()
                  }
                }}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm"
                onClick={() => {
                  const modelViewer = document.querySelector('model-viewer')
                  if (modelViewer) {
                    const camera = (modelViewer as any).getCameraOrbit()
                    ;(modelViewer as any).cameraOrbit = `${camera.theta}deg ${camera.phi}deg 0.5m`
                  }
                }}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Instructions overlay for first-time users */}
          <div className="absolute bottom-20 left-4 right-4 text-center">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              {capabilities?.canViewAR ? (
                <p>Tap "View in AR" to see this product in your space</p>
              ) : (
                <p>Drag to rotate • Pinch to zoom • Double-tap to focus</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Loading overlay */}
      {!modelLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Loading 3D model...</p>
          </div>
        </div>
      )}
    </div>
  )
}
