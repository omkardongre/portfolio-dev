'use client'

import { useRef } from 'react'
import { useGSAP } from '@/lib/gsap'
import { gsap } from 'gsap'
import { MagneticButton } from './magnetic-button'
import { HeroBackground } from './hero-background'
import { StaggeredText } from './staggered-text'

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Avatar animation
    tl.from(avatarRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })

    // Title animation
    tl.from(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.4'
    )

    // Subtitle animation
    tl.from(
      subtitleRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.4'
    )

    // Description animation
    tl.from(
      descRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.3'
    )

    // Buttons animation
    tl.from(
      buttonsRef.current?.children || [],
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      },
      '-=0.2'
    )
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <div
              ref={avatarRef}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
            >
              OD
            </div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            >
              Omkar Dongre
            </h1>
            <h2
              ref={subtitleRef}
              className="text-2xl md:text-3xl text-muted-foreground mb-6 font-medium"
            >
              Fullstack Developer | Software Engineer
            </h2>
            <p
              ref={descRef}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Ex-Sandvine engineer building scalable systems & fullstack apps
              using C++, Next.js, and Node.js.
            </p>
          </div>
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton
              size="lg"
              onClick={() => onNavigate('projects')}
              className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get In Touch
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
