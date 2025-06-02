import * as THREE from "three"

export interface ModelNormalizationOptions {
  targetSize?: number
  centerModel?: boolean
  groundModel?: boolean
  rotationY?: number
  fitStrategy?: 'fit' | 'fill' | 'cover'
  padding?: number
}

export interface ModelNormalizationResult {
  scale: number
  position: THREE.Vector3
  rotation: THREE.Euler
  boundingBox: THREE.Box3
  originalSize: THREE.Vector3
  center: THREE.Vector3
}

/**
 * Normalizes a 3D model for consistent viewing, similar to Fab.com's approach
 * Automatically centers and scales models based on their bounding box
 */
export function normalizeModel(
  scene: THREE.Object3D,
  options: ModelNormalizationOptions = {}
): ModelNormalizationResult {
  const {
    targetSize = 3,
    centerModel = true,
    groundModel = true,
    rotationY = Math.PI / 8,
    fitStrategy = 'fit',
    padding = 0.1
  } = options

  // Calculate bounding box
  const box = new THREE.Box3().setFromObject(scene)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  
  // Calculate scale based on fit strategy
  let scale = 1
  const effectiveTargetSize = targetSize * (1 - padding)
  
  switch (fitStrategy) {
    case 'fit':
      // Fit entire model within target size (default Fab.com behavior)
      const maxDimension = Math.max(size.x, size.y, size.z)
      scale = maxDimension > 0 ? effectiveTargetSize / maxDimension : 1
      break
    case 'fill':
      // Fill target size with model (may crop some parts)
      const minDimension = Math.min(size.x, size.y, size.z)
      scale = minDimension > 0 ? effectiveTargetSize / minDimension : 1
      break
    case 'cover':
      // Cover target size with model (ensures no empty space)
      const avgDimension = (size.x + size.y + size.z) / 3
      scale = avgDimension > 0 ? effectiveTargetSize / avgDimension : 1
      break
  }
  
  // Calculate position
  const position = new THREE.Vector3()
  
  if (centerModel) {
    // Center the model by offsetting its position
    position.copy(center.multiplyScalar(-scale))
  }
  
  if (groundModel) {
    // Adjust vertical position to sit nicely on the ground plane
    const scaledSize = size.clone().multiplyScalar(scale)
    position.y = -scaledSize.y / 2
  }
  
  // Set rotation
  const rotation = new THREE.Euler(0, rotationY, 0)
    return {
    scale,
    position,
    rotation,
    boundingBox: box,
    originalSize: size,
    center
  }
}

/**
 * Applies normalization to a Three.js Group or Object3D
 */
export function applyModelNormalization(
  modelRef: THREE.Group | THREE.Object3D,
  scene: THREE.Object3D,
  options: ModelNormalizationOptions = {}
): ModelNormalizationResult {
  const result = normalizeModel(scene, options)
  
  // Apply the transformations
  modelRef.scale.setScalar(result.scale)
  modelRef.position.copy(result.position)
  modelRef.rotation.copy(result.rotation)
  
  return result
}

/**
 * Gets optimal camera distance based on model size
 */
export function getOptimalCameraDistance(
  boundingBox: THREE.Box3,
  fov: number = 60,
  margin: number = 1.2
): number {
  const size = boundingBox.getSize(new THREE.Vector3())
  const maxDimension = Math.max(size.x, size.y, size.z)
  
  // Calculate distance based on field of view
  const distance = (maxDimension / 2) / Math.tan((fov * Math.PI) / 180 / 2)
  
  return distance * margin
}

/**
 * Gets optimal orbit controls settings based on model size
 */
export function getOptimalOrbitSettings(
  boundingBox: THREE.Box3,
  margin: number = 1.5
) {
  const size = boundingBox.getSize(new THREE.Vector3())
  const maxDimension = Math.max(size.x, size.y, size.z)
  
  return {
    minDistance: maxDimension * 0.5,
    maxDistance: maxDimension * 3 * margin,
    target: boundingBox.getCenter(new THREE.Vector3())
  }
}

/**
 * Detects model type and suggests optimal settings
 */
export function detectModelCharacteristics(scene: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const aspectRatio = {
    xy: size.x / size.y,
    xz: size.x / size.z,
    yz: size.y / size.z
  }
  
  // Detect if model is likely furniture, character, vehicle, etc.
  const isFlat = size.y < Math.min(size.x, size.z) * 0.2
  const isTall = size.y > Math.max(size.x, size.z) * 2
  const isWide = size.x > Math.max(size.y, size.z) * 2
  const isDeep = size.z > Math.max(size.x, size.y) * 2
  
  return {
    size,
    aspectRatio,
    isFlat,
    isTall,
    isWide,
    isDeep,
    suggestedTargetSize: Math.max(2, Math.min(5, Math.max(size.x, size.y, size.z))),
    suggestedRotation: isTall ? 0 : isWide ? Math.PI / 4 : Math.PI / 6
  }
}

/**
 * Gets responsive settings based on screen size
 */
export function getResponsiveModelSettings(screenWidth: number, isMainViewer: true): ResponsiveMainViewerSettings
export function getResponsiveModelSettings(screenWidth: number, isMainViewer: false): ResponsiveMiniViewerSettings
export function getResponsiveModelSettings(screenWidth: number, isMainViewer: boolean = true): ResponsiveMainViewerSettings | ResponsiveMiniViewerSettings {
  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024
  const isDesktop = screenWidth >= 1024

  if (isMainViewer) {
    // Main ModelViewer settings
    if (isMobile) {
      return {
        zoom: 6,
        fov: 75,
        minDistance: 4,
        maxDistance: 15,
        targetSizeMultiplier: 0.8,
        autoRotateSpeed: 0.3,
        rotateSpeed: 0.4,
        dampingFactor: 0.08
      } as ResponsiveMainViewerSettings
    } else if (isTablet) {
      return {
        zoom: 5.5,
        fov: 68,
        minDistance: 3.5,
        maxDistance: 13,
        targetSizeMultiplier: 0.9,
        autoRotateSpeed: 0.4,
        rotateSpeed: 0.5,
        dampingFactor: 0.06
      } as ResponsiveMainViewerSettings
    } else {
      return {
        zoom: 4.5,
        fov: 60,
        minDistance: 3,
        maxDistance: 12,
        targetSizeMultiplier: 1.0,
        autoRotateSpeed: 0.5,
        rotateSpeed: 0.5,
        dampingFactor: 0.05
      } as ResponsiveMainViewerSettings
    }
  } else {
    // MiniModelViewer settings
    if (isMobile && screenWidth < 640) {
      return {
        height: 100,
        cameraDistance: 5.5,
        fov: 50,
        targetSizeMultiplier: 0.6,
        autoRotateSpeed: 0.8,
        rotateSpeed: 0.2
      } as ResponsiveMiniViewerSettings
    } else if (isMobile) {
      return {
        height: 110,
        cameraDistance: 5,
        fov: 45,
        targetSizeMultiplier: 0.7,
        autoRotateSpeed: 0.9,
        rotateSpeed: 0.25
      } as ResponsiveMiniViewerSettings
    } else {
      return {
        height: 120,
        cameraDistance: 4.5,
        fov: 40,
        targetSizeMultiplier: 0.8,
        autoRotateSpeed: 1,
        rotateSpeed: 0.3
      } as ResponsiveMiniViewerSettings
    }
  }
}

export interface ResponsiveMainViewerSettings {
  zoom: number
  fov: number
  minDistance: number
  maxDistance: number
  targetSizeMultiplier: number
  autoRotateSpeed: number
  rotateSpeed: number
  dampingFactor: number
}

export interface ResponsiveMiniViewerSettings {
  height: number
  cameraDistance: number
  fov: number
  targetSizeMultiplier: number
  autoRotateSpeed: number
  rotateSpeed: number
}
