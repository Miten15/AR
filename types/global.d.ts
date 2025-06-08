declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerElementAttributes;
    }
  }

  interface ModelViewerElementAttributes extends React.HTMLAttributes<HTMLElement> {
    src?: string;
    alt?: string;
    ar?: boolean | string;
    'ar-modes'?: string;
    'ar-placement'?: 'floor' | 'wall';
    'ar-scale'?: 'auto' | 'fixed';
    'camera-controls'?: boolean | string;
    'environment-image'?: string;
    poster?: string;
    'shadow-intensity'?: string | number;
    'shadow-softness'?: string | number;
    exposure?: string | number;
    'auto-rotate'?: boolean | string;
    'auto-rotate-delay'?: string | number;
    'rotation-per-second'?: string;
    loading?: 'auto' | 'lazy' | 'eager';
    reveal?: 'auto' | 'interaction';
    'min-camera-orbit'?: string;
    'max-camera-orbit'?: string;
    'camera-orbit'?: string;
    'camera-target'?: string;
    'field-of-view'?: string;
    'min-field-of-view'?: string;
    'max-field-of-view'?: string;
    interpolation?: string;
    scale?: string;
    'skybox-image'?: string;
    'animation-name'?: string;
    'animation-crossfade-duration'?: string | number;
    autoplay?: boolean | string;
    'variant-name'?: string;
    orientation?: string;
    // Add other specific model-viewer attributes here as needed

    // Standard HTML Attributes
    class?: string; // 'className' is for React components, 'class' for custom elements
    style?: React.CSSProperties;

    // Event handlers (ensure correct casing as per model-viewer docs if needed)
    onLoad?: (event: any) => void; // It's good practice to type 'event' more specifically if known
    onError?: (event: any) => void;
    'onModel-visibility'?: (event: any) => void;
    'onAr-status'?: (event: any) => void;
    onProgress?: (event: any) => void;
    onInteraction?: (event: any) => void;
    // Add other event handlers as needed
  }

  interface Window {
    customElements: CustomElementRegistry;
  }
}

export {};
