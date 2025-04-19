"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComplete(true)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  const wordArray = words.split(" ")
  const renderWords = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.25 }}>
        {wordArray.map((word, idx) => {
          return (
            <motion.span
              key={`${word}-${idx}`}
              className="dark:text-white text-black opacity-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: idx * 0.1 + 0.1,
              }}
            >
              {word}{" "}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black">{renderWords()}</div>
      </div>
    </div>
  )
}
