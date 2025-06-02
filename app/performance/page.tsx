"use client"

import { useState, useEffect } from "react"
import ModelViewer from "@/components/model-viewer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePerformanceMonitor } from "@/lib/utils/performance-monitor"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Clock, MemoryStick, Gauge, RefreshCw } from "lucide-react"

export default function PerformanceTestPage() {
  const [currentModel, setCurrentModel] = useState("/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb")
  const [refreshKey, setRefreshKey] = useState(0)
  const metrics = usePerformanceMonitor()
  const [screenInfo, setScreenInfo] = useState({ width: 0, height: 0 })

  const models = [
    {
      path: "/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb",
      name: "Anoli Pendant Lamp",
      complexity: "Medium",
      size: "~2.5MB"
    },
    {
      path: "/models/tiffany_lamp.glb",
      name: "Tiffany Lamp",
      complexity: "High",
      size: "~3.2MB"
    },
    {
      path: "/models/triple_ceiling_hanging_lamp.glb",
      name: "Triple Ceiling Lamp",
      complexity: "Low",
      size: "~1.8MB"
    }
  ]

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenInfo({ width: window.innerWidth, height: window.innerHeight })
    }
    updateScreenInfo()
    window.addEventListener('resize', updateScreenInfo)
    return () => window.removeEventListener('resize', updateScreenInfo)
  }, [])

  const getFPSColor = (fps: number) => {
    if (fps >= 50) return "text-green-600"
    if (fps >= 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getFPSProgress = (fps: number) => {
    return Math.min((fps / 60) * 100, 100)
  }

  const getMemoryColor = (memory: number) => {
    if (memory < 50) return "text-green-600"
    if (memory < 100) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            3D Model Performance Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Monitor real-time performance metrics of our optimized 3D model rendering system
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frame Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getFPSColor(metrics.fps)}`}>
                {metrics.fps} FPS
              </div>
              <Progress value={getFPSProgress(metrics.fps)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Target: 60 FPS
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getMemoryColor(metrics.memory)}`}>
                {metrics.memory} MB
              </div>
              <Progress value={Math.min((metrics.memory / 200) * 100, 100)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                JavaScript Heap
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frames Rendered</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {metrics.frameCount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total frames since load
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screen Size</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {screenInfo.width}×{screenInfo.height}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Responsive viewport
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Model Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Model Performance Testing
            </CardTitle>
            <CardDescription>
              Switch between different models to test performance with varying complexity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {models.map((model) => (
                <Button
                  key={model.path}
                  variant={currentModel === model.path ? "default" : "outline"}
                  onClick={() => setCurrentModel(model.path)}
                  className="flex flex-col h-auto p-4"
                >
                  <span className="font-medium">{model.name}</span>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {model.complexity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {model.size}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Performance Counters
            </Button>
          </CardContent>
        </Card>

        {/* 3D Model Viewer */}
        <Card>
          <CardHeader>
            <CardTitle>Optimized 3D Model Viewer</CardTitle>
            <CardDescription>
              Monitor performance while interacting with the 3D model. 
              Fab.com-style auto-normalization and responsive design active.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ModelViewer
              key={`perf-${currentModel}-${refreshKey}`}
              modelPath={currentModel}
              autoRotate={true}
              showWatermark={true}
              className="h-[70vh] min-h-[500px]"
            />
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Optimizations Applied</CardTitle>
            <CardDescription>
              Our implementation includes several performance enhancements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">✅ Model Optimizations</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Auto-normalization reduces overdraw</li>
                  <li>• Bounding box calculations for efficient rendering</li>
                  <li>• Responsive scaling reduces polygon count on mobile</li>
                  <li>• Smart camera positioning minimizes frustum culling</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-blue-600">⚡ Rendering Optimizations</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Damped orbit controls reduce jitter</li>
                  <li>• Constrained camera angles prevent edge cases</li>
                  <li>• Environment presets cached for performance</li>
                  <li>• Model preloading reduces runtime load times</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Targets</CardTitle>
            <CardDescription>
              What to expect across different devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">60 FPS</div>
                <p className="text-sm text-gray-600">
                  Desktop & High-end Mobile
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">30+ FPS</div>
                <p className="text-sm text-gray-600">
                  Mid-range Mobile Devices
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">&lt; 100MB</div>
                <p className="text-sm text-gray-600">
                  Memory Usage Target
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
