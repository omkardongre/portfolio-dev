'use client'

import { useSmoothScroll } from '@/lib/lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll()
  return <>{children}</>
}
