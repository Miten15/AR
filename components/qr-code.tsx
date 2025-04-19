"use client"

import { useEffect, useRef } from "react"
import QRCodeLib from "qrcode"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
  level?: string
  includeMargin?: boolean
}

export default function QRCode({
  value,
  size = 250,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  level = "L",
  includeMargin = false,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: includeMargin ? 4 : 0,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: level as any,
        },
        (error) => {
          if (error) console.error(error)
        },
      )

      // Add AR text in the middle of QR code
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const centerX = size / 2
        const centerY = size / 2
        const radius = size / 10

        // Draw circle background
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = "#4F46E5"
        ctx.fill()

        // Draw AR text
        ctx.font = `bold ${radius}px Arial`
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("AR", centerX, centerY)
      }
    }
  }, [value, size, bgColor, fgColor, level, includeMargin])

  return <canvas ref={canvasRef} />
}
