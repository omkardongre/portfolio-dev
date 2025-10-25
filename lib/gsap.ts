'use client'

import { useGSAP as useGSAPHook } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { useGSAPHook as useGSAP, gsap, ScrollTrigger }
