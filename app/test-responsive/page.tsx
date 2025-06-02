"use client"

import { useState, useEffect } from "react"
import ModelViewer from "@/components/model-viewer"
import MiniModelViewer from "@/components/mini-model-viewer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Tablet, Monitor, RotateCcw } from "lucide-react"

export default function TestResponsivePage() {
  const [currentModel, setCurrentModel] = useState("/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb")
  const [screenInfo, setScreenInfo] = useState({ width: 0, height: 0, type: "unknown" })
  const [refreshKey, setRefreshKey] = useState(0)

  const models = [
    {
      path: "/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb",
      name: "Anoli Pendant Lamp",
      description: "Modern hanging light fixture"
    },
    {
      path: "/models/tiffany_lamp.glb",
      name: "Tiffany Lamp",
      description: "Classic table lamp with colored glass"
    },
    {
      path: "/models/triple_ceiling_hanging_lamp.glb",
      name: "Triple Ceiling Lamp",
      description: "Industrial hanging light trio"
    }
  ]

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      let type = "Desktop"
      
      if (width < 640) {
        type = "Mobile (XS)"
      } else if (width < 768) {
        type = "Mobile (SM)"
      } else if (width < 1024) {
        type = "Tablet"
      } else if (width < 1280) {
        type = "Desktop (LG)"
      } else {
        type = "Desktop (XL)"
      }

      setScreenInfo({ width, height, type })
    }

    updateScreenInfo()
    window.addEventListener('resize', updateScreenInfo)
    return () => window.removeEventListener('resize', updateScreenInfo)
  }, [])

  const getScreenIcon = () => {
    if (screenInfo.width < 768) return <Smartphone className="w-4 h-4" />
    if (screenInfo.width < 1024) return <Tablet className="w-4 h-4" />
    return <Monitor className="w-4 h-4" />
  }

  const getDeviceTypeColor = () => {
    if (screenInfo.width < 768) return "bg-green-500"
    if (screenInfo.width < 1024) return "bg-blue-500"
    return "bg-purple-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Responsive 3D Model Testing
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test the responsive behavior of our 3D model viewers across different screen sizes.
            Resize your browser window to see how the models adapt automatically.
          </p>
        </div>

        {/* Screen Info Card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              {getScreenIcon()}
              Current Screen Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="outline" className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getDeviceTypeColor()}`}></div>
                {screenInfo.type}
              </Badge>
              <span className="text-sm text-gray-600">
                {screenInfo.width} × {screenInfo.height} pixels
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="ml-auto"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Refresh Views
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Model to Test</CardTitle>
            <CardDescription>
              Choose different models to test how the auto-normalization handles various sizes and shapes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {models.map((model) => (
                <Button
                  key={model.path}
                  variant={currentModel === model.path ? "default" : "outline"}
                  onClick={() => setCurrentModel(model.path)}
                  className="flex flex-col h-auto p-4 text-left"
                >
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs opacity-70 mt-1">{model.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Model Viewer */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Main Model Viewer (Responsive)</CardTitle>
            <CardDescription>
              This viewer adapts camera position, FOV, model size, and orbit controls based on screen size
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ModelViewer
              key={`main-${currentModel}-${refreshKey}`}
              modelPath={currentModel}
              autoRotate={true}
              showWatermark={true}
              className="h-[60vh] min-h-[400px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Mini Model Viewers Grid */}
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Mini Model Viewers (Responsive)</CardTitle>
            <CardDescription>
              These thumbnail viewers show different models with responsive sizing and auto-rotation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <div key={model.path} className="space-y-2">
                  <MiniModelViewer
                    key={`mini-${model.path}-${refreshKey}`}
                    modelPath={model.path}
                    className="border border-gray-200"
                  />
                  <div className="text-center">
                    <h3 className="font-medium text-sm">{model.name}</h3>
                    <p className="text-xs text-gray-500">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Features Info */}
      <div className="max-w-7xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Responsive Features</CardTitle>
            <CardDescription>
              What changes automatically based on your screen size
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">                <h4 className="font-medium text-green-600 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile (&lt; 768px)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Increased zoom distance (6)</li>
                  <li>• Wider FOV (75°)</li>
                  <li>• Smaller models (0.8x scale)</li>
                  <li>• Higher damping for smooth controls</li>
                  <li>• Mini viewers: 100-110px height</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-600 flex items-center gap-2">
                  <Tablet className="w-4 h-4" />
                  Tablet (768-1024px)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Medium zoom distance (5.5)</li>
                  <li>• Moderate FOV (68°)</li>
                  <li>• Medium models (0.9x scale)</li>
                  <li>• Balanced control sensitivity</li>
                  <li>• Mini viewers: 110px height</li>
                </ul>
              </div>
              <div className="space-y-2">                <h4 className="font-medium text-purple-600 flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Desktop (&gt; 1024px)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Standard zoom distance (4.5)</li>
                  <li>• Normal FOV (60°)</li>
                  <li>• Full-size models (1.0x scale)</li>
                  <li>• Precise orbit controls</li>
                  <li>• Mini viewers: 120px height</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
