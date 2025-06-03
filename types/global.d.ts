/// <reference path="./model-viewer.d.ts" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        ar?: boolean | string
        'ar-modes'?: string
        'camera-controls'?: boolean | string
        'environment-image'?: string
        poster?: string
        'shadow-intensity'?: string | number
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
    customElements: CustomElementRegistry;
  }
}

export {};
