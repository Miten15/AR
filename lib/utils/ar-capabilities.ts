export interface ARCapabilities {
  hasWebXR: boolean
  hasARCore: boolean
  hasARKit: boolean
  hasQuickLook: boolean
  hasSceneViewer: boolean
  canViewAR: boolean
  platform: 'ios' | 'android' | 'desktop' | 'unknown'
  browser: string
  recommendedMethod: 'webxr' | 'quicklook' | 'sceneviewer' | 'web-ar' | 'fallback'
}

export class ARCapabilityDetector {
  private static instance: ARCapabilityDetector
  private capabilities: ARCapabilities | null = null

  private constructor() {}

  static getInstance(): ARCapabilityDetector {
    if (!ARCapabilityDetector.instance) {
      ARCapabilityDetector.instance = new ARCapabilityDetector()
    }
    return ARCapabilityDetector.instance
  }

  async detectCapabilities(): Promise<ARCapabilities> {
    if (this.capabilities) {
      return this.capabilities
    }

    const userAgent = navigator.userAgent
    const platform = this.detectPlatform()
    const browser = this.detectBrowser()

    // Check for WebXR support
    const hasWebXR = 'xr' in navigator && 'isSessionSupported' in (navigator as any).xr
    
    // Check for AR support on different platforms
    const hasARKit = platform === 'ios' && this.checkARKitSupport()
    const hasQuickLook = platform === 'ios' && this.checkQuickLookSupport()
    const hasARCore = platform === 'android' && await this.checkARCoreSupport()
    const hasSceneViewer = platform === 'android' && this.checkSceneViewerSupport()

    let webXRSupported = false
    if (hasWebXR) {
      try {
        const xr = (navigator as any).xr
        webXRSupported = await xr.isSessionSupported('immersive-ar')
      } catch (error) {
        console.log('WebXR AR not supported:', error)
      }
    }

    const canViewAR = webXRSupported || hasARKit || hasQuickLook || hasARCore || hasSceneViewer

    // Determine the best AR method
    let recommendedMethod: ARCapabilities['recommendedMethod'] = 'fallback'
    if (webXRSupported) {
      recommendedMethod = 'webxr'
    } else if (hasQuickLook && platform === 'ios') {
      recommendedMethod = 'quicklook'
    } else if (hasSceneViewer && platform === 'android') {
      recommendedMethod = 'sceneviewer'
    } else if (canViewAR) {
      recommendedMethod = 'web-ar'
    }

    this.capabilities = {
      hasWebXR: webXRSupported,
      hasARCore,
      hasARKit,
      hasQuickLook,
      hasSceneViewer,
      canViewAR,
      platform,
      browser,
      recommendedMethod
    }

    return this.capabilities
  }

  private detectPlatform(): ARCapabilities['platform'] {
    const userAgent = navigator.userAgent
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'ios'
    }
    
    if (/Android/.test(userAgent)) {
      return 'android'
    }
    
    if (/Windows|Mac|Linux/.test(userAgent)) {
      return 'desktop'
    }
    
    return 'unknown'
  }

  private detectBrowser(): string {
    const userAgent = navigator.userAgent
    
    if (userAgent.includes('Chrome')) return 'chrome'
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'safari'
    if (userAgent.includes('Firefox')) return 'firefox'
    if (userAgent.includes('Edge')) return 'edge'
    
    return 'unknown'
  }

  private checkARKitSupport(): boolean {
    // ARKit is available on iOS 11+ devices
    const iosVersion = this.getIOSVersion()
    return iosVersion >= 11
  }

  private checkQuickLookSupport(): boolean {
    // Quick Look AR is available on iOS 12+ with A9+ chip
    const iosVersion = this.getIOSVersion()
    return iosVersion >= 12
  }

  private async checkARCoreSupport(): Promise<boolean> {
    // Check if device likely supports ARCore
    // This is a simplified check - in reality, ARCore support depends on specific device models
    const userAgent = navigator.userAgent
    
    // Common ARCore supported devices patterns
    const arcorePatterns = [
      /Pixel/i,
      /Galaxy S[89]/i,
      /Galaxy S1[0-9]/i,
      /Galaxy S2[0-9]/i,
      /Galaxy Note/i,
      /OnePlus/i,
      /Xiaomi/i,
      /LG G[67]/i,
      /Huawei P[23]/i,
      /Mate [12][0-9]/i
    ]
    
    return arcorePatterns.some(pattern => pattern.test(userAgent))
  }

  private checkSceneViewerSupport(): boolean {
    // Scene Viewer is available on Android devices with Google Play Services
    // and ARCore support
    const userAgent = navigator.userAgent
    return /Android [89]|Android 1[0-9]/.test(userAgent)
  }

  private getIOSVersion(): number {
    const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
    if (match) {
      return parseInt(match[1], 10)
    }
    return 0
  }

  // Public method to get capabilities without detection
  getCapabilities(): ARCapabilities | null {
    return this.capabilities
  }

  // Method to check if AR is supported on current device
  async isARSupported(): Promise<boolean> {
    const capabilities = await this.detectCapabilities()
    return capabilities.canViewAR
  }

  // Method to get the best AR launch URL for a model
  async getARLaunchUrl(modelUrl: string, fallbackUrl: string): Promise<string> {
    const capabilities = await this.detectCapabilities()
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const fullModelUrl = modelUrl.startsWith('http') ? modelUrl : `${origin}${modelUrl}`

    switch (capabilities.recommendedMethod) {
      case 'quicklook':
        return fullModelUrl.replace('.glb', '.usdz')
        
      case 'sceneviewer':
        return `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(fullModelUrl)}&mode=ar_preferred&resizable=true&disable_occlusion=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end;`
        
      case 'webxr':
      case 'web-ar':
        return fallbackUrl
        
      default:
        return fallbackUrl
    }
  }
}

export const arCapabilityDetector = ARCapabilityDetector.getInstance()
