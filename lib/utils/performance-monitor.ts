import { useEffect, useState } from 'react'

export interface PerformanceMetrics {
  fps: number
  memory: number
  loadTime: number
  renderTime: number
  frameCount: number
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0,
    renderTime: 0,
    frameCount: 0
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measurePerformance = () => {
      const currentTime = performance.now()
      frameCount++

      // Calculate FPS every second
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Get memory usage if available
        const memory = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
          : 0

        setMetrics(prev => ({
          ...prev,
          fps,
          memory,
          frameCount: prev.frameCount + frameCount
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measurePerformance)
    }

    measurePerformance()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return metrics
}

export function trackModelLoadTime(modelPath: string, callback: (time: number) => void) {
  const startTime = performance.now()
  
  return () => {
    const loadTime = performance.now() - startTime
    callback(loadTime)
    console.log(`Model ${modelPath} loaded in ${loadTime.toFixed(2)}ms`)
  }
}
