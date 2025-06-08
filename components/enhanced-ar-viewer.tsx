"use client"

import { useEffect, useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
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
  Share2,
  Download,
  HelpCircle
} from 'lucide-react'
import { arCapabilityDetector, ARCapabilities } from '@/lib/utils/ar-capabilities'
import { Product } from '@/lib/data/products'
import ARCompatibilityChecker from '@/components/ar-compatibility-checker'

interface EnhancedARViewerProps {
  product: Product
  productId: string
}

export default function EnhancedARViewer({ product, productId }: EnhancedARViewerProps) {
  const [capabilities, setCapabilities] = useState<ARCapabilities | null>(null)
  const [loading, setLoading] = useState(true)
  const [arLaunching, setArLaunching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const modelViewerRef = useRef<any>(null)

  useEffect(() => {
    const detectCapabilities = async () => {
      try {
        const caps = await arCapabilityDetector.detectCapabilities()
        setCapabilities(caps)
      } catch (err) {
        setError('Failed to detect AR capabilities')
        console.error('AR capabilities detection error:', err)
      } finally {
        setLoading(false)
      }
    }

    detectCapabilities()
  }, [])

  const launchAR = async () => {
    if (!capabilities || !product.modelPath) return

    setArLaunching(true)
    
    try {
      const fallbackUrl = `${window.location.origin}/product/${productId}/3d`
      const arUrl = await arCapabilityDetector.getARLaunchUrl(product.modelPath, fallbackUrl)
      
      // Add delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (capabilities.recommendedMethod === 'webxr' || capabilities.recommendedMethod === 'web-ar') {
        // For WebXR or web-based AR, use the current page with AR functionality
        activateWebAR()
      } else {
        // For native AR (Scene Viewer/Quick Look), redirect
        window.location.href = arUrl
      }
    } catch (err) {
      setError('Failed to launch AR viewer')
      console.error('AR launch error:', err)
    } finally {
      setArLaunching(false)
    }
  }

  const activateWebAR = () => {
    // Try to activate AR on the model-viewer if it supports it
    if (modelViewerRef.current && modelViewerRef.current.activateAR) {
      modelViewerRef.current.activateAR()
    }
  }

  if (loading) {
    return <LoadingView />
  }

  if (error) {
    return <ErrorView error={error} />
  }

  if (!capabilities) {
    return <ErrorView error="Unable to detect device capabilities" />
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* AR Status Banner */}
      <div className="mb-6">
        <ARStatusBanner capabilities={capabilities} />
      </div>

      {/* Main AR Interface */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Model Viewer with AR Support */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
          <model-viewer
            ref={modelViewerRef}
            src={product.modelPath}
            alt={`AR view of ${product.name}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-placement="floor"
            ar-scale="auto" // Changed from "fixed" to "auto"
            camera-controls
            environment-image="neutral"
            poster={product.image}
            shadow-intensity="1"
            shadow-softness="0.5" // Added shadow-softness
            exposure="1"
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
          
          {/* AR Launch Overlay */}
          {arLaunching && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <div className="text-center text-white">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold mb-2">Launching AR Experience</h3>
                <p className="text-white/80">Preparing {product.name} for AR viewing...</p>
              </div>
            </div>
          )}

          {/* AR Controls Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-sm font-medium text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-600">Tap and hold to place in AR</p>
            </div>
            
            {capabilities.canViewAR && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                AR Ready
              </Badge>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm"
            >
              <Maximize className="w-4 h-4 mr-1" />
              Fullscreen
            </Button>
          </div>
        </div>

        {/* AR Launch Section */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              View {product.name} in Augmented Reality
            </h2>
            <p className="text-gray-600">
              See how this {product.category.toLowerCase()} will look in your space
            </p>
          </div>

          {/* AR Launch Button */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={launchAR}
              disabled={!capabilities.canViewAR || arLaunching}
              size="lg"
              className="w-full max-w-md h-14 text-lg"
            >
              {arLaunching ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Launching AR...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  {capabilities.platform === 'desktop' ? 'Open AR on Phone' : 'View in AR'}
                </>
              )}
            </Button>

            {/* Device-specific instructions */}
            <div className="text-center text-sm text-gray-600">
              <ARInstructions capabilities={capabilities} />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <FeatureCard
              icon={<Camera className="w-5 h-5" />}
              title="Real Scale"
              description="See actual size"
            />
            <FeatureCard
              icon={<RotateCcw className="w-5 h-5" />}
              title="360° View"
              description="Rotate & examine"
            />
            <FeatureCard
              icon={<ZoomIn className="w-5 h-5" />}
              title="Zoom In/Out"
              description="Inspect details"
            />
            <FeatureCard
              icon={<Maximize className="w-5 h-5" />}
              title="Place & Move"
              description="Position anywhere"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-12 h-12 mb-4 animate-spin text-blue-600" />
      <h3 className="text-lg font-semibold mb-2">Detecting AR Capabilities</h3>
      <p className="text-gray-600">Checking what AR features your device supports...</p>
    </div>
  )
}

function ErrorView({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
      <h3 className="text-lg font-semibold mb-2 text-red-700">AR Detection Failed</h3>
      <p className="text-gray-600 text-center max-w-md">{error}</p>
    </div>
  )
}

function ARStatusBanner({ capabilities }: { capabilities: ARCapabilities }) {
  const getStatusColor = () => {
    if (capabilities.canViewAR) {
      return 'bg-green-50 border-green-200 text-green-800'
    }
    return 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }

  const getStatusIcon = () => {
    if (capabilities.canViewAR) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    }
    return <AlertCircle className="w-5 h-5 text-yellow-600" />
  }

  const getStatusMessage = () => {
    if (capabilities.canViewAR) {
      return `AR supported via ${capabilities.recommendedMethod.replace('-', ' ').toUpperCase()}`
    }
    return 'Limited AR support - 3D viewer available as fallback'
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <p className="font-medium">{getStatusMessage()}</p>
          <p className="text-sm opacity-75">
            {capabilities.platform.charAt(0).toUpperCase() + capabilities.platform.slice(1)} device detected • {capabilities.browser} browser
          </p>
        </div>
      </div>
    </div>
  )
}

function ARInstructions({ capabilities }: { capabilities: ARCapabilities }) {
  if (capabilities.platform === 'ios') {
    return (
      <p>
        This will open AR Quick Look. Point your camera at a flat surface and tap to place the model.
      </p>
    )
  }

  if (capabilities.platform === 'android') {
    return (
      <p>
        This will open Google's Scene Viewer. Point your camera at a flat surface and tap to place the model.
      </p>
    )
  }

  if (capabilities.platform === 'desktop') {
    return (
      <p>
        Scan the QR code with your phone or click to open AR on your mobile device.
      </p>
    )
  }

  return (
    <p>
      Your device has limited AR support. You can still view the 3D model and interact with it.
    </p>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-center mb-2 text-blue-600">
        {icon}
      </div>
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  )
}
