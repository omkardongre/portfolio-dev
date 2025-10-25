'use client'

import { gsap } from 'gsap'

/**
 * Fade in animation from bottom
 */
export const fadeInUp = (element: HTMLElement | null, delay = 0) => {
  if (!element) return

  gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  })
}

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (elements: HTMLElement[] | NodeListOf<Element>, stagger = 0.1) => {
  gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger,
    ease: 'power2.out',
  })
}

/**
 * Parallax effect
 */
export const parallax = (element: HTMLElement | null, speed = 0.5) => {
  if (!element) return

  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Scale on scroll
 */
export const scaleOnScroll = (element: HTMLElement | null) => {
  if (!element) return

  gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Text reveal animation
 */
export const textReveal = (element: HTMLElement | null, delay = 0) => {
  if (!element) return

  const chars = element.textContent?.split('') || []
  element.innerHTML = chars.map((char) => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('')

  gsap.from(element.children, {
    y: 50,
    opacity: 0,
    rotationX: -90,
    stagger: 0.02,
    duration: 0.8,
    delay,
    ease: 'back.out(1.7)',
  })
}
