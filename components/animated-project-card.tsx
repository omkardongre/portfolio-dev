'use client'

import { useRef } from 'react'
import { useGSAP } from '@/lib/gsap'
import { gsap } from 'gsap'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

interface AnimatedProjectCardProps {
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  index: number
}

export function AnimatedProjectCard({ 
  title, 
  description, 
  tech, 
  github, 
  demo, 
  index 
}: AnimatedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return

    // Scroll-triggered animation
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      delay: index * 0.1,
    })

    // Hover animation
    const card = cardRef.current
    const onMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', onMouseEnter)
    card.addEventListener('mouseleave', onMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', onMouseEnter)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [index])

  return (
    <div ref={cardRef}>
      <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {github && (
              <Button variant="outline" size="sm" asChild>
                <Link href={github} target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
            {demo && (
              <Button variant="outline" size="sm" asChild>
                <Link href={demo} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
