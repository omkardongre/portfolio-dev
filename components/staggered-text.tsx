'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StaggeredTextProps {
  children: React.ReactNode[]
  delay?: number
  staggerDelay?: number
}

export function StaggeredText({ children, delay = 0, staggerDelay = 100 }: StaggeredTextProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <AnimatePresence>
      {isMounted &&
        children.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * (staggerDelay / 1000),
              ease: [0.645, 0.045, 0.355, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
    </AnimatePresence>
  )
}
