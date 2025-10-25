'use client'

import { Hero3DFallback } from './3d-fallback'

export function HeroBackground() {
  // Using CSS-based animation for React 19 compatibility
  // Three.js has compatibility issues with React 19
  return <Hero3DFallback />
}
