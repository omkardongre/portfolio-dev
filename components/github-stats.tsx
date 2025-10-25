"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GitBranch, Star, GitFork, Calendar, Code, Users, Activity, TrendingUp, Github } from "lucide-react"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
  created_at: string
  bio: string
  location: string
  company: string
}

interface Repository {
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  html_url: string
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Replace with your actual GitHub username
  const username = "omkardongre"

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) throw new Error("Failed to fetch user data")
        const userData = await userResponse.json()
        setStats(userData)

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories")
        const reposData = await reposResponse.json()
        setRepos(reposData)

        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 rounded-full mb-3" />
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-6 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Unable to load GitHub stats</p>
          <p className="text-sm text-muted-foreground mt-2">Please check back later</p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      "C++": "bg-blue-600",
      C: "bg-gray-600",
      HTML: "bg-orange-500",
      CSS: "bg-blue-400",
      Java: "bg-red-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
    }
    return colors[language] || "bg-gray-400"
  }

  return (
    <div className="space-y-8">
      {/* GitHub Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Code className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Repositories</p>
              <p className="text-2xl font-bold">{stats?.public_repos || 0}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Followers</p>
              <p className="text-2xl font-bold">{stats?.followers || 0}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Following</p>
              <p className="text-2xl font-bold">{stats?.following || 0}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Member Since</p>
              <p className="text-2xl font-bold">{stats ? formatDate(stats.created_at) : "N/A"}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* GitHub Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Contribution Activity
            </CardTitle>
            <CardDescription>GitHub contribution graph for the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <img
                src={`https://ghchart.rshah.org/${username}`}
                alt="GitHub Contribution Graph"
                className="w-full max-w-4xl mx-auto"
                style={{ minWidth: "800px" }}
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View full GitHub profile →
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-primary" />
              Recent Repositories
            </CardTitle>
            <CardDescription>Latest projects and contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.slice(0, 6).map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow group cursor-pointer"
                  onClick={() => window.open(repo.html_url, "_blank")}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-primary group-hover:underline">{repo.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        <div className={`w-2 h-2 rounded-full mr-1 ${getLanguageColor(repo.language)}`} />
                        {repo.language}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* GitHub Stats Images */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true&count_private=true`}
                alt="GitHub Stats"
                className="w-full"
              />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true`}
                alt="Top Languages"
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
