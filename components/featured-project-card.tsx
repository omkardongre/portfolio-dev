'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import sr, { srConfig } from '@/lib/scroll-reveal'

interface FeaturedProjectCardProps {
  title: string
  description: string
  tech: string[]
  image: string
  github?: string
  demo?: string
  slug?: string
  index: number
}

export function FeaturedProjectCard({
  title,
  description,
  tech,
  image,
  github,
  demo,
  slug,
  index,
}: FeaturedProjectCardProps) {
  const projectRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    if (projectRef.current && sr) {
      sr.reveal(projectRef.current, {
        ...srConfig,
        delay: index * 100,
      })
    }
  }, [index])

  return (
    <div ref={projectRef} className="relative mb-24">
      <div className={`grid grid-cols-12 gap-4 items-center ${isEven ? '' : 'dir-rtl'}`}>
        {/* Image Section */}
        <div
          className={`col-span-12 md:col-span-7 relative group ${
            isEven ? 'md:col-start-1' : 'md:col-start-6'
          }`}
        >
          <Link href={slug ? `/projects/${slug}` : '#'} className="block relative">
            <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-all duration-300 group-hover:bg-transparent" />
            </div>
          </Link>
        </div>

        {/* Content Section */}
        <div
          className={`col-span-12 md:col-span-6 relative z-10 ${
            isEven
              ? 'md:col-start-7 md:text-right'
              : 'md:col-start-1 md:row-start-1 md:text-left'
          }`}
        >
          <div className="space-y-4">
            {/* Project Number */}
            <p className="text-sm font-mono text-primary">Featured Project #{index + 1}</p>

            {/* Title */}
            <h3 className="text-3xl font-bold">
              <Link
                href={slug ? `/projects/${slug}` : '#'}
                className="hover:text-primary transition-colors"
              >
                {title}
              </Link>
            </h3>

            {/* Description Card */}
            <Card className="p-6 bg-card/95 backdrop-blur-sm shadow-lg">
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </Card>

            {/* Tech Stack */}
            <div
              className={`flex flex-wrap gap-2 ${
                isEven ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              {tech.slice(0, 5).map((t, i) => (
                <Badge key={i} variant="secondary" className="font-mono text-xs">
                  {t}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div
              className={`flex gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
            >
              {github && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </Link>
                </Button>
              )}
              {demo && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </Button>
              )}
              {slug && (
                <Button size="sm" asChild>
                  <Link href={`/projects/${slug}`}>View Details</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
