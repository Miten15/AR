export {}

/// <reference types="react" />

// Type definitions for model-viewer web component
declare global {
  namespace JSX {
    interface IntrinsicElements {      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        ar?: boolean | string
        'ar-modes'?: string
        'ar-placement'?: string
        'ar-scale'?: string
        'camera-controls'?: boolean | string
        'touch-action'?: string
        'environment-image'?: string
        poster?: string
        'shadow-intensity'?: string | number
        'shadow-softness'?: string | number
        exposure?: string | number
        'auto-rotate'?: boolean | string
        'auto-rotate-delay'?: string | number
        'rotation-per-second'?: string
        loading?: 'auto' | 'lazy' | 'eager'
        reveal?: 'auto' | 'interaction'
        'min-camera-orbit'?: string
        'max-camera-orbit'?: string
        'camera-orbit'?: string
        'camera-target'?: string
        'field-of-view'?: string
        'min-field-of-view'?: string
        'max-field-of-view'?: string
        'interaction-prompt'?: string
        interpolation?: string
        scale?: string
        'skybox-image'?: string
        'animation-name'?: string
        'animation-crossfade-duration'?: string | number
        autoplay?: boolean | string
        'variant-name'?: string
        orientation?: string
        ref?: React.Ref<any>
        onLoad?: () => void
        onError?: () => void
        'onModel-visibility'?: () => void
        'onAr-status'?: () => void
        style?: React.CSSProperties
        className?: string
      }
    }
  }

  interface Window {
    customElements: CustomElementRegistry
  }
}

// Model Viewer element interface
interface ModelViewerElement extends HTMLElement {
  activateAR(): void
  dismissPoster(): void
  resetTurntableRotation(): void
  getCameraOrbit(): { theta: number; phi: number; radius: number }
  getCameraTarget(): { x: number; y: number; z: number }
  jumpCameraToGoal(): void
  updateFraming(): void
  toDataURL(type?: string, encoderOptions?: number): string
  toBlob(options?: { mimeType?: string; qualityArgument?: number; idealAspect?: boolean }): Promise<Blob>
  cameraOrbit: string
  cameraTarget: string
  autoRotate: boolean
  autoRotateDelay: number
  rotationPerSecond: string
}
