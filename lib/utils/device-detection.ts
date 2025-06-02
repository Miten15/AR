import { useEffect, useState } from 'react'

export interface DeviceCapabilities {
  tier: 'high' | 'medium' | 'low'
  maxTextureSize: number
  supportsCompressedTextures: boolean
  memoryLimit: number
  maxVertices: number
  antialiasing: boolean
  shadows: boolean
}

export function useDeviceDetection(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    tier: 'medium',
    maxTextureSize: 1024,
    supportsCompressedTextures: false,
    memoryLimit: 100,
    maxVertices: 50000,
    antialiasing: true,
    shadows: true
  })

  useEffect(() => {
    const detectCapabilities = () => {
      // Get basic device info
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      
      if (!gl) {
        setCapabilities({
          tier: 'low',
          maxTextureSize: 512,
          supportsCompressedTextures: false,
          memoryLimit: 50,
          maxVertices: 10000,
          antialiasing: false,
          shadows: false
        })
        return
      }

      // Detect device characteristics
      const renderer = gl.getParameter(gl.RENDERER) || ''
      const vendor = gl.getParameter(gl.VENDOR) || ''
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 1024
      
      // Check for compressed texture support
      const hasS3TC = gl.getExtension('WEBGL_compressed_texture_s3tc')
      const hasETC1 = gl.getExtension('WEBGL_compressed_texture_etc1')
      const hasASTC = gl.getExtension('WEBGL_compressed_texture_astc')
      
      // Device memory (if available)
      const memory = (navigator as any).deviceMemory || 4 // GB
      
      // Screen size and pixel density
      const screenWidth = window.screen.width
      const pixelRatio = window.devicePixelRatio || 1
      
      // Determine device tier
      let tier: 'high' | 'medium' | 'low' = 'medium'
      
      // High-end devices
      if (
        memory >= 8 ||
        maxTextureSize >= 4096 ||
        (screenWidth >= 1920 && pixelRatio <= 2) ||
        renderer.includes('RTX') ||
        renderer.includes('RX 6') ||
        renderer.includes('RX 7')
      ) {
        tier = 'high'
      }
      // Low-end devices
      else if (
        memory <= 2 ||
        maxTextureSize <= 1024 ||
        (screenWidth <= 768 && pixelRatio >= 2) ||
        renderer.includes('Mali-400') ||
        renderer.includes('Adreno 3') ||
        vendor.includes('ARM')
      ) {
        tier = 'low'
      }

      setCapabilities({
        tier,
        maxTextureSize: Math.min(maxTextureSize, tier === 'high' ? 2048 : tier === 'medium' ? 1024 : 512),
        supportsCompressedTextures: !!(hasS3TC || hasETC1 || hasASTC),
        memoryLimit: tier === 'high' ? 200 : tier === 'medium' ? 100 : 50,
        maxVertices: tier === 'high' ? 100000 : tier === 'medium' ? 50000 : 20000,
        antialiasing: tier !== 'low',
        shadows: tier === 'high'
      })

      console.log('Device Detection Results:', {
        tier,
        renderer,
        vendor,
        memory,
        maxTextureSize,
        screenWidth,
        pixelRatio
      })
    }

    detectCapabilities()
  }, [])

  return capabilities
}

export function getModelQualitySettings(capabilities: DeviceCapabilities) {
  switch (capabilities.tier) {
    case 'high':
      return {
        modelScale: 1.0,
        textureQuality: 1.0,
        shadowQuality: 'high' as const,
        antialiasingEnabled: true,
        environmentQuality: 'high' as const,
        autoRotateSpeed: 0.5,
        dampingFactor: 0.05
      }
    case 'medium':
      return {
        modelScale: 0.9,
        textureQuality: 0.8,
        shadowQuality: 'medium' as const,
        antialiasingEnabled: true,
        environmentQuality: 'medium' as const,
        autoRotateSpeed: 0.4,
        dampingFactor: 0.08
      }
    case 'low':
      return {
        modelScale: 0.7,
        textureQuality: 0.6,
        shadowQuality: 'off' as const,
        antialiasingEnabled: false,
        environmentQuality: 'low' as const,
        autoRotateSpeed: 0.3,
        dampingFactor: 0.12
      }
  }
}
