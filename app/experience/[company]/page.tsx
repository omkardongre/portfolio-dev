"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const experienceData = {
  sandvine: {
    company: "Sandvine",
    role: "Software Engineer",
    duration: "Jan 2020 - Dec 2022",
    location: "Waterloo, ON, Canada",
    type: "Full-time",
    team: "Data Plane Engineering",
    companySize: "1000+ employees",
    industry: "Network Intelligence & Traffic Management",
    companyDescription:
      "Sandvine is a global leader in network intelligence and traffic management solutions, serving over 160 service providers worldwide. The company specializes in deep packet inspection (DPI) technology and real-time network analytics.",

    overview:
      "As a Software Engineer in the Data Plane team, I worked on high-performance network processing systems that handle millions of packets per second. My role involved developing and optimizing C/C++ applications for real-time traffic analysis and management in telecommunications networks.",

    keyResponsibilities: [
      "Developed high-performance C/C++ applications for real-time packet processing and traffic analysis",
      "Implemented network protocols and deep packet inspection (DPI) algorithms for traffic classification",
      "Optimized data plane performance achieving 40% improvement in packet processing throughput",
      "Collaborated with cross-functional teams including Product Management, QA, and DevOps",
      "Participated in code reviews and maintained coding standards across the engineering team",
      "Debugged complex network issues using tools like Wireshark, GDB, and custom logging frameworks",
      "Contributed to system architecture decisions for next-generation traffic management platforms",
    ],

    majorProjects: [
      {
        name: "High-Performance Packet Classifier",
        description:
          "Designed and implemented a multi-threaded packet classification engine that processes network traffic in real-time",
        technologies: ["C++", "Linux", "DPDK", "Multi-threading"],
        impact: "Improved classification accuracy by 25% and reduced latency by 30%",
        details: [
          "Implemented lock-free data structures for concurrent packet processing",
          "Optimized memory allocation patterns reducing cache misses by 40%",
          "Integrated with existing DPI engine maintaining backward compatibility",
          "Achieved processing rates of 10Gbps+ on commodity hardware",
        ],
      },
      {
        name: "Traffic Analytics Dashboard Backend",
        description: "Built RESTful APIs and data processing pipelines for real-time network analytics",
        technologies: ["C++", "Python", "REST APIs", "JSON", "SQLite"],
        impact: "Enabled real-time monitoring for 50+ telecom operators worldwide",
        details: [
          "Designed efficient data aggregation algorithms for time-series metrics",
          "Implemented caching mechanisms reducing API response time by 60%",
          "Created automated data validation and quality assurance processes",
          "Built comprehensive logging and monitoring for production systems",
        ],
      },
      {
        name: "Network Protocol Stack Enhancement",
        description: "Enhanced existing protocol parsers and added support for emerging network protocols",
        technologies: ["C", "Network Protocols", "Wireshark", "Protocol Buffers"],
        impact: "Extended platform support to 15+ new protocols including HTTP/3 and QUIC",
        details: [
          "Reverse-engineered protocol specifications from network captures",
          "Implemented state machines for complex protocol parsing",
          "Created comprehensive test suites with 95%+ code coverage",
          "Collaborated with standards bodies for protocol compliance",
        ],
      },
    ],

    achievements: [
      "Received 'Outstanding Performance' rating for 2 consecutive years",
      "Led knowledge sharing sessions on C++ best practices and performance optimization",
      "Mentored 3 junior developers and interns during tenure",
      "Contributed to 5 patent applications related to network traffic analysis",
      "Reduced critical bug count by 45% through improved testing methodologies",
    ],

    technicalSkills: [
      "C/C++ (Advanced)",
      "Linux System Programming",
      "Network Protocols",
      "Multi-threading",
      "DPDK",
      "Performance Optimization",
      "Debugging Tools",
      "Git",
      "Agile/Scrum",
    ],

    learningOutcomes: [
      "Mastered low-level system programming and performance optimization techniques",
      "Gained deep understanding of network protocols and telecommunications infrastructure",
      "Developed expertise in concurrent programming and lock-free data structures",
      "Learned to work with large-scale distributed systems handling terabytes of data",
      "Enhanced problem-solving skills through complex debugging scenarios",
    ],

    testimonials: [
      {
        name: "Sarah Chen",
        role: "Senior Engineering Manager",
        quote:
          "Omkar consistently delivered high-quality code and showed exceptional problem-solving skills. His optimization work on the packet classifier was instrumental in meeting our performance targets.",
      },
      {
        name: "Michael Rodriguez",
        role: "Principal Software Architect",
        quote:
          "One of the most dedicated engineers I've worked with. Omkar's deep understanding of network protocols and attention to detail made him invaluable to our team.",
      },
    ],
  },

  bentley: {
    company: "Bentley Systems",
    role: "Software Engineering Intern",
    duration: "May 2019 - Aug 2020",
    location: "Pune, India",
    type: "Internship",
    team: "Infrastructure & Automation",
    companySize: "4000+ employees",
    industry: "Infrastructure Engineering Software",
    companyDescription:
      "Bentley Systems is a leading global provider of software solutions for infrastructure engineering. The company serves engineers, architects, and construction professionals with comprehensive software for designing, building, and operating infrastructure.",

    overview:
      "As a Software Engineering Intern, I worked on database automation and quality assurance processes. My role involved developing Python scripts for database management, creating Selenium-based test automation frameworks, and contributing to CI/CD pipeline improvements.",

    keyResponsibilities: [
      "Developed Python scripts for automated database schema migrations and data validation",
      "Created Selenium WebDriver test suites for web application quality assurance",
      "Implemented automated reporting systems for test execution and database health monitoring",
      "Collaborated with senior engineers on infrastructure automation projects",
      "Participated in daily standups and sprint planning meetings",
      "Documented technical processes and created knowledge base articles",
      "Assisted in troubleshooting production database issues",
    ],

    majorProjects: [
      {
        name: "Database Migration Automation Tool",
        description:
          "Built a comprehensive Python-based tool for automating database schema migrations across multiple environments",
        technologies: ["Python", "SQL", "PostgreSQL", "Bash", "Jenkins"],
        impact: "Reduced manual migration time from 4 hours to 15 minutes, eliminating human errors",
        details: [
          "Designed rollback mechanisms for safe schema changes",
          "Implemented validation checks ensuring data integrity during migrations",
          "Created detailed logging and error reporting for troubleshooting",
          "Integrated with Jenkins CI/CD pipeline for automated deployments",
        ],
      },
      {
        name: "Web Application Test Automation Suite",
        description: "Developed comprehensive Selenium-based testing framework for critical user workflows",
        technologies: ["Python", "Selenium WebDriver", "pytest", "HTML/CSS", "Jenkins"],
        impact: "Achieved 80% test automation coverage, reducing manual testing effort by 60%",
        details: [
          "Implemented Page Object Model design pattern for maintainable tests",
          "Created data-driven test cases using CSV and JSON test data",
          "Built custom reporting dashboard showing test execution trends",
          "Integrated with continuous integration pipeline for automated testing",
        ],
      },
      {
        name: "Database Health Monitoring System",
        description: "Created monitoring solution for tracking database performance and identifying potential issues",
        technologies: ["Python", "SQL", "Grafana", "InfluxDB", "Bash"],
        impact: "Proactively identified 15+ performance bottlenecks before they affected users",
        details: [
          "Developed custom metrics collection for database performance monitoring",
          "Created alerting system for critical database events",
          "Built interactive dashboards for real-time system health visualization",
          "Implemented automated backup verification and recovery testing",
        ],
      },
    ],

    achievements: [
      "Received 'Exceptional Intern' recognition for outstanding contributions",
      "Presented automation tools to senior leadership team",
      "Reduced database deployment time by 85% through automation",
      "Created documentation that became standard reference for new team members",
      "Successfully completed all assigned projects ahead of schedule",
    ],

    technicalSkills: [
      "Python",
      "SQL",
      "Selenium WebDriver",
      "Database Management",
      "Test Automation",
      "Jenkins",
      "Git",
      "Linux",
      "Bash Scripting",
      "Agile Methodologies",
    ],

    learningOutcomes: [
      "Gained hands-on experience with enterprise software development practices",
      "Learned database design principles and performance optimization techniques",
      "Developed expertise in test automation and quality assurance processes",
      "Enhanced understanding of CI/CD pipelines and DevOps practices",
      "Improved communication skills through cross-team collaboration",
    ],

    testimonials: [
      {
        name: "David Kumar",
        role: "Senior Database Administrator",
        quote:
          "Omkar's automation tools transformed our database deployment process. His attention to detail and proactive approach made him stand out among interns.",
      },
      {
        name: "Lisa Thompson",
        role: "QA Engineering Manager",
        quote:
          "Exceptional work on test automation. Omkar's framework became the foundation for our entire testing strategy. His technical skills and work ethic were impressive.",
      },
    ],
  },
}

export default function ExperienceDetail({ params }: { params: { company: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const experience = experienceData[params.company as keyof typeof experienceData]

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/omkardongre" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href="https://linkedin.com/in/omkardongre" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge variant="secondary" className="text-sm">
                {experience.type}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {experience.industry}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{experience.company}</h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-6">{experience.role}</p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">{experience.overview}</p>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-muted-foreground text-sm">{experience.duration}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground text-sm">{experience.location}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Team</h3>
                <p className="text-muted-foreground text-sm">{experience.team}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Company Size</h3>
                <p className="text-muted-foreground text-sm">{experience.companySize}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Company Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg leading-relaxed">{experience.companyDescription}</p>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Responsibilities</h3>
                      <ul className="space-y-2">
                        {experience.keyResponsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {experience.majorProjects.map((project, index) => (
                  <Card key={index} className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
                      <CardDescription className="text-base">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Impact:</h4>
                        <p className="text-muted-foreground">{project.impact}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Details:</h4>
                        <ul className="space-y-1">
                          {project.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Award className="w-6 h-6 text-primary" />
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {experience.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Technical Skills Developed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {experience.technicalSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Learning Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {experience.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid gap-6"
              >
                {experience.testimonials.map((testimonial, index) => (
                  <Card key={index} className="shadow-lg">
                    <CardContent className="p-6">
                      <blockquote className="text-lg italic text-muted-foreground mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Interested in My Experience?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Let's discuss how my experience at {experience.company} can benefit your team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/resume/omkar-dongre-resume.pdf"
                  link.download = "Omkar-Dongre-Resume.pdf"
                  link.click()
                }}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
