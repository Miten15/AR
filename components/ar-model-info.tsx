"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Info, X } from "lucide-react"

interface ARModelInfoProps {
  productName: string
  fixedPosition?: boolean
}

export default function ARModelInfo({ productName, fixedPosition = true }: ARModelInfoProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Auto-hide after 10 seconds if not expanded
    const timer = setTimeout(() => {
      if (!expanded) {
        setIsVisible(false)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [expanded])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 left-4 right-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-md">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-medium">{productName}</h3>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {expanded && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">
                This model is displayed in actual size and{" "}
                {fixedPosition ? "will stay fixed in place" : "can be moved around"}.
              </p>
              {fixedPosition && (
                <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                  <strong>Tip:</strong> Walk around to view the product from different angles.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-4 py-2 text-center">
          <button onClick={() => setExpanded(!expanded)} className="text-sm text-blue-600 font-medium">
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
