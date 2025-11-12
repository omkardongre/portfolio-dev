"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const experienceData = {
  sandvine: {
    company: "Sandvine",
    role: "Software Engineer",
    duration: "2021 - 2023",
    location: "Banglore, India",
    type: "Full-time",
    team: "Data Plane Engineering",
    companySize: "1000+ employees",
    industry: "Network Intelligence & Traffic Management",
    companyDescription:
      "Sandvine is a global leader in network intelligence and traffic management solutions, serving over 160 service providers worldwide. The company specializes in deep packet inspection (DPI) technology and real-time network analytics.",

    overview:
      "As a Software Engineer in the Data Plane team, I designed and implemented advanced network security and threat detection systems. My role involved developing Go microservices for real-time threat detection, optimizing network protocols, and building scalable infrastructure for distributed threat mitigation across multiple network devices.",

    keyResponsibilities: [
      "Designed and implemented centralized security engine (MSE) for distributed threat detection across multiple PRE devices",
      "Developed real-time threat detection system using Go microservices with Reader and Processor services",
      "Handled concurrent data aggregation from multiple network devices via WebSocket connections",
      "Built scalable threat mitigation framework integrating LACP (802.3ad), VLAN tagging, and connection classification",
      "Enhanced session context protocol between PRE and MPE devices with sticky-bit flag optimization",
      "Optimized inter-service communication using gRPC for high-performance data transfer",
      "Implemented system diagnostics monitoring with Python APIs and HTTP-based metric collection",
    ],

    majorProjects: [
      {
        name: "Network Protection - Scans and Volumetric Attacks",
        description:
          "Designed and implemented network attack detection and mitigation system for IQ52K platform to detect and prevent address scans, port scans, flow floods, and SYN floods",
        technologies: [
          "C++",
          "Python",
          "Connection Classifier",
          "PLRCD",
          "VPL Testing",
        ],
        impact:
          "Enabled comprehensive network protection against scans and volumetric attacks with automated threat mitigation",
        details: [
          "Modified ALclient to add connection classifier object for threat classification",
          "Created PLRCD data structures for storing and managing detected threats",
          "Developed Python APIs for threat detection and mitigation configuration",
          "Implemented VPL testing framework using TRex traffic generator to validate threat detection and mitigation",
          "Conducted unit testing and manual testing to ensure system reliability",
        ],
      },
      {
        name: "Centralized Security Engine (MSE)",
        description:
          "Designed and implemented a centralized security engine for distributed threat detection across multiple PRE devices in a clustered network environment",
        technologies: [
          "Go",
          "Microservices",
          "WebSocket",
          "gRPC",
          "Python",
          "Docker",
        ],
        impact:
          "Enabled real-time threat detection and aggregation across distributed network infrastructure with centralized policy enforcement",
        details: [
          "Developed Go microservices architecture with Reader service for concurrent data aggregation from multiple PREs via WebSocket",
          "Implemented Processor service with threat detection algorithms and global data structure management",
          "Integrated with MPE (Maestro Policy Engine) for session mapping and subscriber identification via HTTP",
          "Implemented system diagnostics monitoring with Python APIs and HTTP-based metric collection",
          "Designed and deployed MSE as Docker container on bare-metal PRE hardware",
          "Resolved Golang concurrency issues with channels and goroutines for reliable data processing",
          "Implemented VPL end-to-end testing for threat detection scenarios",
        ],
      },
      {
        name: "Session Context Protocol Optimization - Sticky-bit Flag",
        description:
          "Enhanced session context protocol between PRE and MPE devices by introducing sticky-bit flag optimization to reduce unnecessary data transmission and improve performance",
        technologies: [
          "C++",
          "Protocol Design",
          "gRPC",
          "HTTP",
          "Performance Tuning",
        ],
        impact:
          "Reduced CPU load and memory consumption by eliminating unnecessary counter transmissions, improving overall system efficiency",
        details: [
          "Introduced sticky-bit flag in policy columns to control counter transmission behavior",
          "Optimized inter-service communication using gRPC for high-performance data transfer",
          "Implemented HTTP-based control plane operations for policy updates",
          "Conducted performance testing demonstrating reduced CPU load and memory consumption",
          "Implemented unit tests and VPL automation testing to validate sticky-bit logic",
          "Achieved significant reduction in system resource usage in production environments",
        ],
      },
    ],

    achievements: [
      "Designed and implemented network protection system detecting scans and volumetric attacks with automated mitigation",
      "Developed centralized security engine (MSE) enabling real-time threat detection across distributed network devices",
      "Optimized session context protocol with sticky-bit flag, reducing CPU load and memory consumption",
      "Implemented Go microservices architecture handling concurrent data aggregation from multiple network devices",
      "Created comprehensive testing framework using VPL (Virtual Packet Logic) for end-to-end validation",
      "Resolved critical Golang concurrency issues ensuring reliable data processing in production",
      "Implemented YANG data modeling for network interface configuration including LACP and VLAN support",
    ],

    technicalSkills: [
      "Go (Golang)",
      "C++ (Advanced)",
      "Python",
      "Microservices Architecture",
      "WebSocket",
      "gRPC",
      "HTTP APIs",
      "Network Protocols (TCP, LACP, VLAN, 802.3ad, 802.1Q)",
      "Docker",
      "YANG Modeling",
      "Linux System Programming",
      "Performance Optimization",
      "Concurrent Programming",
      "VPL Testing",
      "Unit Testing",
      "Git",
    ],

    learningOutcomes: [
      "Mastered Go microservices architecture and concurrent programming with channels and goroutines",
      "Gained deep expertise in network security, threat detection, and attack mitigation systems",
      "Developed proficiency in protocol optimization and performance tuning for distributed systems",
      "Learned to design scalable distributed systems for real-time data processing and aggregation",
      "Enhanced understanding of network infrastructure, telecommunications, and network protocols",
      "Developed expertise in YANG data modeling and network device configuration management",
      "Gained hands-on experience with comprehensive testing frameworks and VPL testing methodology",
    ],
  },

  bentley: {
    company: "Bentley Systems",
    role: "Software Engineering Intern",
    duration: "Jan 2021 - Jul 2021",
    location: "Pune, India",
    type: "Internship",
    team: "Infrastructure & Automation",
    companySize: "4000+ employees",
    industry: "Infrastructure Engineering Software",
    companyDescription:
      "Bentley Systems is a leading global provider of software solutions for infrastructure engineering. The company serves engineers, architects, and construction professionals with comprehensive software for designing, building, and operating infrastructure.",

    overview:
      "As a Software Engineering Intern, I worked on database migration and quality assurance processes. My role involved leading an Oracle to MSSQL database migration project, developing comprehensive test automation frameworks using Selenium, and implementing automated reporting systems for test execution and database health monitoring.",

    keyResponsibilities: [
      "Led Oracle to MSSQL database migration project to reduce operational costs",
      "Converted complex Oracle event handler scripts to MSSQL with optimized SQL queries",
      "Ensured data integrity and accuracy during migration with comprehensive validation procedures",
      "Enhanced automation testing framework for ALIM web application",
      "Developed and maintained comprehensive test suites using Selenium WebDriver",
      "Created detailed test analysis reports through HTML reporting and log file analysis",
      "Optimized JMeter performance testing scripts and resolved accuracy issues",
      "Implemented bug tracking and resolution processes to prevent regression issues",
      "Collaborated with development teams to establish testing protocols",
    ],

    majorProjects: [
      {
        name: "Oracle to MSSQL Database Migration",
        description:
          "Led comprehensive database migration project converting Oracle database infrastructure to Microsoft SQL Server while maintaining full functionality and reducing operational costs",
        technologies: ["Oracle", "MSSQL", "SQL", "Bash"],
        impact:
          "Successfully migrated database infrastructure reducing operational expenses without functionality loss",
        details: [
          "Analyzed complex Oracle event handler scripts and converted to MSSQL",
          "Optimized SQL queries for improved performance in new environment",
          "Implemented comprehensive validation and testing procedures",
          "Ensured data integrity and accuracy during migration process",
          "Delivered cost-effective database solution maintaining full functionality",
        ],
      },
      {
        name: "ALIM Web Application Test Automation Enhancement",
        description:
          "Enhanced existing Selenium-based testing framework for Asset Lifecycle Information Management web application with improved test coverage and automation",
        technologies: [
          "Selenium WebDriver",
          "JMeter",
          "HTML Reporting",
          "Automation Testing",
        ],
        impact:
          "Enhanced test coverage and accuracy for critical infrastructure management platform",
        details: [
          "Enhanced existing automation testing framework for ALIM web application",
          "Developed and maintained comprehensive test suites for critical functionality",
          "Created detailed test analysis reports through HTML reporting",
          "Optimized JMeter performance testing scripts improving load testing reliability",
          "Implemented bug tracking and resolution processes preventing regression issues",
        ],
      },
    ],

    achievements: [
      "Successfully led Oracle to MSSQL database migration reducing operational costs",
      "Enhanced automation testing framework for critical ALIM platform",
      "Improved test coverage and accuracy for infrastructure management platform",
      "Streamlined testing workflows and improved defect detection rates",
      "Optimized JMeter performance testing scripts improving load testing reliability",
      "Established robust testing protocols improving software delivery quality",
    ],

    technicalSkills: [
      "SQL",
      "Oracle Database",
      "Microsoft SQL Server (MSSQL)",
      "Selenium WebDriver",
      "JMeter",
      "Test Automation",
      "Database Migration",
      "HTML Reporting",
      "Functional Testing",
      "Performance Testing",
      "Regression Testing",
      "Bash Scripting",
      "Git",
      "Linux",
    ],

    learningOutcomes: [
      "Gained hands-on experience with enterprise-scale infrastructure management software",
      "Learned database design principles and complex migration strategies",
      "Developed expertise in test automation and quality assurance processes",
      "Mastered performance testing and load testing methodologies",
      "Enhanced understanding of database optimization and query performance",
      "Developed analytical abilities through complex database migration challenges",
      "Improved problem-solving skills through test automation and defect analysis",
    ],
  },
};

export default function ExperienceDetail({
  params,
}: {
  params: { company: string };
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const experience =
    experienceData[params.company as keyof typeof experienceData];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com/omkardongre"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button size="sm" asChild>
                <a
                  href="https://www.linkedin.com/in/omkar-dongre-133942151"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {experience.company}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-6">
              {experience.role}
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {experience.overview}
            </p>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Duration</h3>
                <p className="text-muted-foreground text-sm">
                  {experience.duration}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Location</h3>
                <p className="text-muted-foreground text-sm">
                  {experience.location}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <Users className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Team</h3>
                <p className="text-muted-foreground text-sm">
                  {experience.team}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <Target className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Company Size</h3>
                <p className="text-muted-foreground text-sm">
                  {experience.companySize}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              aria-label="Experience sections"
              className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8"
            >
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">Company Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-lg leading-relaxed">
                      {experience.companyDescription}
                    </p>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {experience.keyResponsibilities.map(
                          (responsibility, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {responsibility}
                              </span>
                            </li>
                          )
                        )}
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                      <CardHeader className="relative z-10 border-b border-border/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                              {project.name}
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                              {project.description}
                            </CardDescription>
                          </div>
                          <div className="text-3xl">🚀</div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6 relative z-10 pt-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <span className="text-primary">→</span> Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2 ml-6">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="group-hover:bg-primary/20 transition-colors">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-border/0 via-border/50 to-border/0"></div>

                        <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-lg text-primary mb-3 flex items-center gap-2">
                            <span>💡</span> Impact
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {project.impact}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <span className="text-primary">→</span> Key Details
                          </h4>
                          <ul className="space-y-2 ml-6">
                            {project.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start gap-3"
                              >
                                <span className="text-primary font-bold mt-0.5">✓</span>
                                <span className="text-muted-foreground leading-relaxed">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl flex items-center gap-3 group-hover:text-primary transition-colors">
                      <Award className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid gap-4">
                      {experience.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary/0 border border-primary/20 rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                              <TrendingUp className="w-4 h-4" />
                            </div>
                          </div>
                          <span className="text-muted-foreground leading-relaxed">
                            {achievement}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      Technical Skills Developed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-3">
                      {experience.technicalSkills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            className="text-sm px-4 py-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer group-hover:scale-110"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      Learning Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-3">
                      {experience.learningOutcomes.map((outcome, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/50 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
                            {outcome}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Interested in My Experience?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Let's discuss how my experience at {experience.company} can
              benefit your team
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
                  const link = document.createElement("a");
                  link.href = "/resume/omkar-dongre-resume.pdf";
                  link.download = "Omkar-Dongre-Resume.pdf";
                  link.click();
                }}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
