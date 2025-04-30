"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ARInstructions() {
  const [currentStep, setCurrentStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const steps = [
    {
      title: "Find a flat surface",
      description: "Point your camera at a flat surface like a floor or table.",
    },
    {
      title: "Tap to place",
      description: "Once you see the placement indicator, tap to place the model.",
    },
    {
      title: "Model is fixed",
      description: "The model will stay in place. Walk around to view from all angles.",
    },
  ]

  if (dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-sm z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                AR Instructions
              </h3>
              <button onClick={() => setDismissed(true)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className={`flex items-start ${currentStep >= index ? "opacity-100" : "opacity-50"}`}>
                  <div className="mr-3 mt-0.5">
                    {currentStep > index ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          currentStep === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="text-sm font-medium text-blue-600 disabled:text-gray-400"
            >
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button onClick={() => setCurrentStep(currentStep + 1)} className="text-sm font-medium text-blue-600">
                Next
              </button>
            ) : (
              <button onClick={() => setDismissed(true)} className="text-sm font-medium text-blue-600">
                Got it
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
