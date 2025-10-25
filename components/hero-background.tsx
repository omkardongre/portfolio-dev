'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Hero3DFallback } from './3d-fallback'

const Hero3D = dynamic(() => import('./3d-hero').then((mod) => ({ default: mod.Hero3D })), {
  ssr: false,
  loading: () => <Hero3DFallback />,
})

export function HeroBackground() {
  const [use3D, setUse3D] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check device capabilities
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const hasLowPerformance = navigator.hardwareConcurrency < 4
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    setUse3D(!isMobile && !hasLowPerformance && !prefersReducedMotion)
  }, [])

  if (!mounted) {
    return <Hero3DFallback />
  }

  return use3D ? <Hero3D /> : <Hero3DFallback />
}
