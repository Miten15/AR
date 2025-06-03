"use client"

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Smartphone, 
  Camera,
  Eye,
  Wifi,
  Zap
} from 'lucide-react'
import { arCapabilityDetector, ARCapabilities } from '@/lib/utils/ar-capabilities'

interface ARCompatibilityCheckerProps {
  onCapabilitiesDetected?: (capabilities: ARCapabilities) => void
}

export default function ARCompatibilityChecker({ onCapabilitiesDetected }: ARCompatibilityCheckerProps) {
  const [capabilities, setCapabilities] = useState<ARCapabilities | null>(null)
  const [checks, setChecks] = useState<CompatibilityCheck[]>([])
  const [loading, setLoading] = useState(true)

  interface CompatibilityCheck {
    name: string
    status: 'pass' | 'fail' | 'warning' | 'info'
    message: string
    icon: React.ReactNode
  }

  useEffect(() => {
    const runCompatibilityChecks = async () => {
      try {
        const caps = await arCapabilityDetector.detectCapabilities()
        setCapabilities(caps)
        onCapabilitiesDetected?.(caps)

        const newChecks: CompatibilityCheck[] = []

        // Device check
        if (caps.platform === 'ios' || caps.platform === 'android') {
          newChecks.push({
            name: 'Mobile Device',
            status: 'pass',
            message: `${caps.platform.toUpperCase()} device detected`,
            icon: <Smartphone className="w-4 h-4" />
          })
        } else {
          newChecks.push({
            name: 'Mobile Device',
            status: 'warning',
            message: 'AR works best on mobile devices',
            icon: <Smartphone className="w-4 h-4" />
          })
        }

        // Camera access check
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            stream.getTracks().forEach(track => track.stop())
            newChecks.push({
              name: 'Camera Access',
              status: 'pass',
              message: 'Camera available',
              icon: <Camera className="w-4 h-4" />
            })
          } catch (error) {
            newChecks.push({
              name: 'Camera Access',
              status: 'fail',
              message: 'Camera permission required',
              icon: <Camera className="w-4 h-4" />
            })
          }
        } else {
          newChecks.push({
            name: 'Camera Access',
            status: 'fail',
            message: 'Camera not supported',
            icon: <Camera className="w-4 h-4" />
          })
        }

        // AR capability check
        if (caps.canViewAR) {
          newChecks.push({
            name: 'AR Support',
            status: 'pass',
            message: `${caps.recommendedMethod.toUpperCase()} available`,
            icon: <Eye className="w-4 h-4" />
          })
        } else {
          newChecks.push({
            name: 'AR Support',
            status: 'warning',
            message: '3D viewer available as fallback',
            icon: <Eye className="w-4 h-4" />
          })
        }

        // Internet connection check
        if (navigator.onLine) {
          newChecks.push({
            name: 'Internet Connection',
            status: 'pass',
            message: 'Connected',
            icon: <Wifi className="w-4 h-4" />
          })
        } else {
          newChecks.push({
            name: 'Internet Connection',
            status: 'fail',
            message: 'Connection required',
            icon: <Wifi className="w-4 h-4" />
          })
        }

        // Performance check (simplified)
        const performanceScore = getPerformanceScore()
        if (performanceScore > 80) {
          newChecks.push({
            name: 'Device Performance',
            status: 'pass',
            message: 'Good performance expected',
            icon: <Zap className="w-4 h-4" />
          })
        } else if (performanceScore > 50) {
          newChecks.push({
            name: 'Device Performance',
            status: 'warning',
            message: 'Moderate performance',
            icon: <Zap className="w-4 h-4" />
          })
        } else {
          newChecks.push({
            name: 'Device Performance',
            status: 'fail',
            message: 'Performance may be limited',
            icon: <Zap className="w-4 h-4" />
          })
        }

        setChecks(newChecks)
      } catch (error) {
        console.error('Compatibility check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    runCompatibilityChecks()
  }, [onCapabilitiesDetected])

  const getPerformanceScore = (): number => {
    // Simplified performance scoring based on device characteristics
    let score = 50 // Base score

    // Check for hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency) {
      score += Math.min(navigator.hardwareConcurrency * 10, 30)
    }

    // Check for device memory (if available)
    if ('deviceMemory' in navigator) {
      score += Math.min((navigator as any).deviceMemory * 5, 20)
    }

    // Check for WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      score += 20
    }

    return Math.min(score, 100)
  }

  const getOverallStatus = () => {
    if (!checks.length) return 'loading'
    
    const failCount = checks.filter(c => c.status === 'fail').length
    const warningCount = checks.filter(c => c.status === 'warning').length
    
    if (failCount === 0 && warningCount === 0) return 'excellent'
    if (failCount === 0) return 'good'
    if (failCount <= 1) return 'fair'
    return 'poor'
  }

  const getStatusBadge = () => {
    const status = getOverallStatus()
    
    switch (status) {
      case 'excellent':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Excellent AR Support
          </Badge>
        )
      case 'good':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Good AR Support
          </Badge>
        )
      case 'fair':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Limited AR Support
          </Badge>
        )
      case 'poor':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Poor AR Support
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Info className="w-3 h-3 mr-1" />
            Checking...
          </Badge>
        )
    }
  }

  const getRecommendation = () => {
    const status = getOverallStatus()
    const platform = capabilities?.platform
    
    switch (status) {
      case 'excellent':
        return "Your device has excellent AR support! You'll get the best experience."
      case 'good':
        return "Your device supports AR well. You may experience minor limitations."
      case 'fair':
        return platform === 'desktop' 
          ? "For the best AR experience, scan the QR code with your phone."
          : "Your device has limited AR support, but you can still view 3D models."
      case 'poor':
        return "AR may not work on this device. Try the 3D viewer instead."
      default:
        return "Checking your device's AR capabilities..."
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Checking AR compatibility...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">AR Compatibility</h3>
        {getStatusBadge()}
      </div>

      {/* Recommendation */}
      <p className="text-sm text-gray-600">{getRecommendation()}</p>

      {/* Detailed Checks */}
      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`flex-shrink-0 ${
              check.status === 'pass' ? 'text-green-600' :
              check.status === 'warning' ? 'text-yellow-600' :
              check.status === 'fail' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {check.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{check.name}</p>
              <p className="text-xs text-gray-500">{check.message}</p>
            </div>
            <div className="flex-shrink-0">
              {check.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-600" />}
              {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
              {check.status === 'fail' && <AlertTriangle className="w-4 h-4 text-red-600" />}
              {check.status === 'info' && <Info className="w-4 h-4 text-gray-600" />}
            </div>
          </div>
        ))}
      </div>

      {/* Device Info */}
      {capabilities && (
        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 space-y-1">
            <div>Platform: {capabilities.platform} • Browser: {capabilities.browser}</div>
            <div>Recommended method: {capabilities.recommendedMethod.replace('-', ' ').toUpperCase()}</div>
          </div>
        </div>
      )}
    </div>
  )
}
