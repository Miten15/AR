"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
}) => {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      {items.map((item) => (
        <TooltipComponent key={item.id} item={item} />
      ))}
    </div>
  )
}

const TooltipComponent = ({
  item,
}: {
  item: {
    id: number
    name: string
    designation: string
    image: string
  }
}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="group relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className={cn(
            "h-10 w-10 rounded-full object-cover object-top transition-all duration-200",
            isHovered && "z-30 h-12 w-12",
          )}
        />
      </div>
      <div
        className={cn(
          "absolute top-0 flex flex-col items-center justify-center rounded-lg opacity-0 transition-all",
          isHovered && "z-50 opacity-100",
        )}
      >
        <div className="relative -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-4 py-2 text-sm text-white">
          <div className="absolute inset-x-0 -bottom-1 mx-auto h-2 w-2 rotate-45 bg-black" />
          <p className="font-bold">{item.name}</p>
          <p className="text-xs">{item.designation}</p>
        </div>
      </div>
    </div>
  )
}
