'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Briefcase, 
  Link as LinkIcon, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Target,
  Award,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface JobMatchResult {
  matchScore: number
  recommendation: 'Strong Yes' | 'Yes' | 'Maybe' | 'No'
  matchingSkills: string[]
  missingSkills: string[]
  relevantExperience: string[]
  keyStrengths: string[]
  areasToHighlight: string[]
  summary: string
}

export function JobMatchAnalyzer() {
  const [jobUrl, setJobUrl] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<JobMatchResult | null>(null)
  const [inputMethod, setInputMethod] = useState<'url' | 'text'>('url')

  const analyzeJob = async () => {
    if (!jobUrl && !jobDescription) {
      toast.error('Please provide a job URL or description')
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const response = await fetch('/api/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobUrl: inputMethod === 'url' ? jobUrl : undefined,
          jobDescription: inputMethod === 'text' ? jobDescription : undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to analyze job')
      }

      const data = await response.json()
      setResult(data)
      toast.success('Job analysis complete!')
    } catch (error) {
      console.error('Job match error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to analyze job')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getRecommendationColor = (rec: string) => {
    if (rec === 'Strong Yes') return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50'
    if (rec === 'Yes') return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50'
    if (rec === 'Maybe') return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50'
    return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50'
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            Job Match Analyzer
          </CardTitle>
          <CardDescription>
            Paste a job posting URL or description to see how well Omkar matches the role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as 'url' | 'text')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <LinkIcon className="w-4 h-4 mr-2" />
                Job URL
              </TabsTrigger>
              <TabsTrigger value="text">
                <FileText className="w-4 h-4 mr-2" />
                Job Description
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="https://linkedin.com/jobs/view/..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  disabled={isAnalyzing}
                />
                <p className="text-xs text-muted-foreground">
                  Paste a job posting URL from LinkedIn, Indeed, or any job board
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled={isAnalyzing}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Copy and paste the complete job description including requirements and responsibilities
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={analyzeJob}
            disabled={isAnalyzing || (!jobUrl && !jobDescription)}
            className="w-full mt-4"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Job Match...
              </>
            ) : (
              <>
                <Target className="w-5 h-5 mr-2" />
                Analyze Job Match
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Match Score Card */}
            <Card className="shadow-lg border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="relative inline-block"
                  >
                    <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-muted opacity-20"
                      />
                      <motion.circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className={getScoreColor(result.matchScore)}
                        strokeDasharray={`${2 * Math.PI * 90}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - result.matchScore / 100) }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 100px' }}
                      />
                      <text
                        x="100"
                        y="100"
                        textAnchor="middle"
                        dy="0.3em"
                        className={`text-5xl font-bold ${getScoreColor(result.matchScore)}`}
                      >
                        {result.matchScore}%
                      </text>
                    </svg>
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-bold mb-2">Match Score</h3>
                    <Badge variant="outline" className={`text-lg px-4 py-2 ${getRecommendationColor(result.recommendation)}`}>
                      {result.recommendation}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {result.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matching Skills */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Matching Skills ({result.matchingSkills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.matchingSkills.map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Badge variant="outline" className="bg-green-500/10 border-green-500/50">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Skills */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <XCircle className="w-5 h-5" />
                    Missing Skills ({result.missingSkills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.length > 0 ? (
                      result.missingSkills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Badge variant="outline" className="bg-red-500/10 border-red-500/50">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No critical skills missing!</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Key Strengths */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.keyStrengths.map((strength, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas to Highlight */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Areas to Highlight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.areasToHighlight.map((area, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <Target className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{area}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Relevant Experience */}
            {result.relevantExperience.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Relevant Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.relevantExperience.map((exp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{exp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
