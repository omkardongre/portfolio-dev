'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Zap, Clock, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface Metric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  icon: React.ReactNode
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [fps, setFps] = useState(60)

  useEffect(() => {
    // FPS Counter
    let lastTime = performance.now()
    let frames = 0

    const measureFPS = () => {
      frames++
      const currentTime = performance.now()
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)))
        frames = 0
        lastTime = currentTime
      }
      requestAnimationFrame(measureFPS)
    }

    const animationId = requestAnimationFrame(measureFPS)

    // Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      const metricsData: Metric[] = []

      onFCP((metric) => {
        metricsData.push({
          name: 'FCP',
          value: metric.value,
          rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
          icon: <Zap className="w-4 h-4" />,
        })
        setMetrics([...metricsData])
      })

      onLCP((metric) => {
        metricsData.push({
          name: 'LCP',
          value: metric.value,
          rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
          icon: <Clock className="w-4 h-4" />,
        })
        setMetrics([...metricsData])
      })

      onCLS((metric) => {
        metricsData.push({
          name: 'CLS',
          value: metric.value,
          rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
          icon: <Activity className="w-4 h-4" />,
        })
        setMetrics([...metricsData])
      })

      onTTFB((metric) => {
        metricsData.push({
          name: 'TTFB',
          value: metric.value,
          rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
          icon: <TrendingUp className="w-4 h-4" />,
        })
        setMetrics([...metricsData])
      })
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50'
      case 'needs-improvement':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50'
      case 'poor':
        return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50'
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50'
    }
  }

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3)
    }
    return `${Math.round(value)}ms`
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Performance Metrics
        </CardTitle>
        <CardDescription>
          Real-time performance monitoring powered by Web Vitals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* FPS Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-card"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">FPS</span>
            </div>
            <div className="text-2xl font-bold">{fps}</div>
            <Badge
              variant="outline"
              className={fps >= 55 ? getRatingColor('good') : getRatingColor('needs-improvement')}
            >
              {fps >= 55 ? 'Excellent' : 'Good'}
            </Badge>
          </motion.div>

          {/* Web Vitals */}
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                {metric.icon}
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="text-2xl font-bold">{formatValue(metric.name, metric.value)}</div>
              <Badge variant="outline" className={getRatingColor(metric.rating)}>
                {metric.rating === 'good' ? 'Good' : metric.rating === 'needs-improvement' ? 'Fair' : 'Poor'}
              </Badge>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> These metrics are measured in real-time using Google's Web Vitals library.
            FCP (First Contentful Paint), LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), and
            TTFB (Time to First Byte) are core web vitals that measure user experience.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
