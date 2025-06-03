"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MovingCardsProps {
  items: {
    title: string
    description: string
    image?: string
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}

export const MovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: MovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    setStart(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return

    const scrollerContent = Array.from(scrollerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem)
      }
    })

    const getDirection = () => {
      if (direction === "left") {
        return "-"
      } else {
        return ""
      }
    }

    const getSpeed = () => {
      if (speed === "fast") {
        return "30s"
      } else if (speed === "normal") {
        return "40s"
      } else {
        return "80s"
      }
    }

    scrollerRef.current.setAttribute(
      "style",
      `--animation-direction: ${getDirection()}; --animation-duration: ${getSpeed()};`,
    )
  }, [direction, speed])

  return (
    <div ref={containerRef} className={cn("scroller relative z-20 max-w-7xl overflow-hidden", className)}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-8 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full min-h-[180px] relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-200 shadow-md px-8 py-8 md:w-[450px] bg-white dark:bg-slate-900"
            key={item.title + idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)]"
              ></div>
              <span className="relative z-20 text-base leading-[1.7] text-gray-800 dark:text-gray-100 font-normal">{item.description}</span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-600 dark:text-gray-300 font-semibold">{item.title}</span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
