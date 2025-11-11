"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Calendar,
  Code,
  Database,
  Server,
  Smartphone,
  Cloud,
  GitBranch,
  ArrowRight,
  Star,
  Trophy,
  Award,
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
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubStats } from "@/components/github-stats";
import { ContactForm } from "@/components/contact-form";
import { AIChat } from "@/components/ai-chat";
import { JobMatchAnalyzer } from "@/components/job-match-analyzer";
import { MobileMenu } from "@/components/mobile-menu";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showContent, setShowContent] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Refs for ScrollReveal
  const aboutRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const jobMatchRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "journey",
        "projects",
        "github-stats",
        "freelance",
        "opensource",
        "skills",
        "resume",
        "achievements",
        "job-match",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press 'H' to go home
      if (e.key === "h" || e.key === "H") {
        if (
          !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
        ) {
          scrollToSection("home");
        }
      }
      // Press 'C' to go to contact
      if (e.key === "c" || e.key === "C") {
        if (
          !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
        ) {
          scrollToSection("contact");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // ScrollReveal for sections
  useEffect(() => {
    if (!showContent || typeof window === "undefined") return;

    // Dynamically import ScrollReveal only on client
    import("scrollreveal").then((ScrollReveal) => {
      const sr = ScrollReveal.default();

      const srConfig = {
        origin: "bottom",
        distance: "20px",
        duration: 600,
        delay: 200,
        opacity: 0,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        reset: false,
      };

      const refs = [
        aboutRef,
        journeyRef,
        projectsRef,
        skillsRef,
        resumeRef,
        achievementsRef,
        jobMatchRef,
        contactRef,
      ];

      refs.forEach((ref, index) => {
        if (ref.current) {
          sr.reveal(ref.current, {
            ...srConfig,
            delay: 100 + index * 50,
          });
        }
      });
    });
  }, [showContent]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without jumping
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-xl"
              >
                Omkar Dongre
              </motion.div>
              <div className="hidden md:flex space-x-8">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "journey", label: "Journey" },
                  { id: "projects", label: "Projects" },
                  { id: "skills", label: "Skills" },
                  { id: "achievements", label: "Achievements" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === item.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <MobileMenu
                  activeSection={activeSection}
                  onNavigate={scrollToSection}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                  OD
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Omkar Dongre
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 font-medium">
                  Fullstack Developer | Software Engineer
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Ex-Sandvine engineer building scalable systems & fullstack
                  apps using C++, Next.js, and Node.js.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "💼",
                  title: "Experience",
                  description:
                    "2+ years at Sandvine & Bentley Systems, specializing in C/C++ and system-level programming",
                },
                {
                  icon: "🚀",
                  title: "Fullstack Developer",
                  description:
                    "Building scalable web applications with React, Next.js, Node.js, and modern tech stacks",
                },
                {
                  icon: "🎯",
                  title: "Problem Solver",
                  description:
                    "Passionate about bridging low-level systems knowledge with high-level application development",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section ref={journeyRef} id="journey" className="py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">My Journey</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {[
                  {
                    year: "2021–2023",
                    company: "Sandvine",
                    slug: "sandvine",
                    role: "Software Engineer",
                    description:
                      "Designed and implemented centralized security engine (MSE) for distributed threat detection. Developed real-time threat detection system using Go microservices with Reader and Processor services handling concurrent data aggregation via WebSocket connections.",
                    icon: <Code className="w-6 h-6" />,
                    side: "left",
                    highlights: [
                      "Centralized security engine (MSE) for threat detection",
                      "Go microservices architecture with real-time processing",
                      "Protocol optimization reducing CPU load and memory consumption",
                    ],
                  },
                  {
                    year: "Jan–Jul 2019",
                    company: "Bentley Systems",
                    slug: "bentley",
                    role: "Software Engineering Intern",
                    description:
                      "Led Oracle to MSSQL database migration project. Developed comprehensive Selenium-based test automation framework for ALIM platform. Optimized JMeter performance testing scripts.",
                    icon: <Database className="w-6 h-6" />,
                    side: "right",
                    highlights: [
                      "Oracle to MSSQL database migration",
                      "ALIM test automation framework enhancement",
                      "JMeter performance testing optimization",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${item.side === "left" ? "justify-start" : "justify-end"}`}
                  >
                    <Card
                      className={`w-full max-w-md shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden ${
                        item.side === "left" ? "mr-8" : "ml-8"
                      }`}
                    >
                      <CardHeader className="relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 group-hover:scale-110">
                            {item.icon}
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {item.company}
                            </CardTitle>
                            <CardDescription className="text-primary font-medium">
                              {item.role}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      {/* Gradient accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                      
                      <CardContent className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {item.description}
                        </p>

                        {/* Key Highlights */}
                        <div className="space-y-2 mb-4">
                          {item.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-primary" />
                              <span className="text-xs text-muted-foreground">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Link href={`/experience/${item.slug}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Featured Projects</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "SocialHub",
                  slug: "socialhub",
                  description:
                    "Microservices-based social media platform with real-time chat, notifications, media uploads, and activity feeds. Features scalable, event-driven architecture, automated cloud deployment, and robust CI/CD for high reliability and easy extensibility.",
                  tech: [
                    "Next.js",
                    "NestJS",
                    "Express.js",
                    "Docker",
                    "AWS ECS",
                    "RabbitMQ",
                  ],
                  image: "/socialhub/socialhub-01.png",
                  github: "https://github.com/omkardongre/socialhub",
                  icon: "🌐",
                },
                {
                  name: "Video Sharing Platform",
                  slug: "video-sharing",
                  description:
                    "Cross-platform video sharing platform with real-time recording, uploads, AI transcription and summaries, dynamic CMS management, secure cloud storage, team collaboration, notifications, and an integrated AI chatbot.",
                  tech: [
                    "Next.js",
                    "Electron",
                    "Node.js",
                    "Socket.IO",
                    "AWS S3",
                    "Prisma",
                    "AssemblyAI",
                    "Google Gemini",
                    "Voiceflow",
                    "WIX CMS",
                  ],
                  image: "/videoSharing/videoSharing-01.png",
                  github: "https://github.com/omkardongre/video-sharing",
                  icon: "🎥",
                },
                {
                  name: "Food Ordering App",
                  slug: "food-ordering-app",
                  description:
                    "A Food ordering platform where users can browse restaurants, add menu items to cart, place orders, and pay online. Restaurant owners can manage their restaurant profile, menus, and track incoming orders in real time.",
                  tech: [
                    "React",
                    "Express.js",
                    "TypeScript",
                    "MongoDB Atlas",
                    "Stripe",
                    "Auth0",
                    "Cloudinary",
                    "Vercel",
                    "Render",
                  ],
                  image: "/foodOrdering/foodOrdering-01.png",
                  github: "https://github.com/omkardongre/Food-Ordering-App",
                  demo: "https://restaurant.omkard.site/",
                  icon: "🍕",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full backdrop-blur-sm bg-gradient-to-br from-card/50 to-card/30 border-border/50 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer overflow-hidden">
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {project.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 group-hover:line-clamp-none transition-all">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="group-hover:bg-primary/20 transition-colors"
                          >
                            {t}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tech.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-1"
                          >
                            <Link href={project.github} target="_blank">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </Link>
                          </Button>
                        )}
                        {project.demo && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-1"
                          >
                            <Link href={project.demo} target="_blank">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </Link>
                          </Button>
                        )}
                      </div>
                      <Link href={`/projects/${project.slug}`}>
                        <Button className="w-full mt-2" variant="default">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Stats Section */}
        <section id="github-stats" className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">GitHub Activity</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here's a snapshot of my coding activity, contributions, and open
                source work on GitHub.
              </p>
            </motion.div>

            <GitHubStats />
          </div>
        </section>

        {/* Freelance Section */}
        <section id="freelance" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Freelance Work</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                <CardContent className="p-12 relative z-10">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Coming Soon</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Working on freelance fullstack projects — soon to list
                    selected client work here.
                  </p>
                  <p className="text-muted-foreground">
                    Currently accepting new projects and collaborations. Get in
                    touch to discuss your next idea!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Open Source Section */}
        <section id="opensource" className="py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                Open Source Contributions
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Contributing to open source projects in workflow automation and
                developer tooling. Passionate about improving developer
                experience and building robust solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto mb-12"
            >
              <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      ⚙️
                    </div>
                  </div>
                  <CardTitle className="text-3xl group-hover:text-primary transition-colors mb-2">
                    Trigger.dev
                  </CardTitle>
                  <CardDescription className="text-base">
                    Workflow automation platform for developers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <span className="text-primary">→</span> Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "Node.js"].map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="group-hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <span className="text-primary">→</span> My Contributions
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Enhanced the trigger.dev core engine by improving
                      concurrency management and refining stack trace clarity
                      for better error reporting. Addressed critical database
                      build and deployment issues while contributing to overall
                      code quality and maintainability.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="w-full group-hover:shadow-lg transition-all"
                  >
                    <a
                      href="https://github.com/triggerdotdev/trigger.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project on GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Open to Collaboration
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    I'm always interested in contributing to meaningful open
                    source projects. If you have a project you think I'd be a
                    good fit for, let's connect!
                  </p>
                  <Button asChild size="lg" className="rounded-full">
                    <a
                      href="https://github.com/omkardongre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Follow on GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card> */}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} id="skills" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Skills & Technologies</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Languages",
                  icon: <Code className="w-6 h-6" />,
                  skills: [
                    "C",
                    "C++",
                    "Python",
                    "JavaScript",
                    "TypeScript",
                    "Bash",
                  ],
                },
                {
                  category: "Frontend",
                  icon: <Smartphone className="w-6 h-6" />,
                  skills: [
                    "React",
                    "Next.js",
                    "Angular",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                  ],
                },
                {
                  category: "Backend",
                  icon: <Server className="w-6 h-6" />,
                  skills: [
                    "Node.js",
                    "Express",
                    "NestJS",
                    "REST APIs",
                    "GraphQL",
                  ],
                },
                {
                  category: "DevOps/Tools",
                  icon: <Cloud className="w-6 h-6" />,
                  skills: [
                    "Docker",
                    "Git",
                    "MongoDB",
                    "Firebase",
                    "AWS EC2/ECS",
                  ],
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto mb-3">
                        {category.icon}
                      </div>
                      <CardTitle className="text-xl">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="hover:bg-primary/10 hover:border-primary transition-colors duration-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section ref={resumeRef} id="resume" className="py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Resume</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                <CardContent className="p-12 relative z-10">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📄</div>
                  <h3 className="text-2xl font-bold mb-4">
                    Download My Resume
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Get a detailed overview of my experience, skills, and
                    achievements.
                  </p>
                  <a
                    href="/resume.pdf"
                    download="Omkar-Dongre-Resume.pdf"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section ref={achievementsRef} id="achievements" className="py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Hackathon Achievements</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Showcasing my hackathon wins and innovative solutions built during competitions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
              {/* Auth0 Hackathon Win */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:bg-card/80 relative overflow-hidden">
                  {/* Gradient accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🏆</div>
                      <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/50">
                        <Trophy className="w-3 h-3 mr-1" />
                        Winner
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors mb-2">
                      Auth0 Hackathon 2025
                    </CardTitle>
                    <CardDescription className="text-base">
                      Autonomous multi-agent ESG compliance automation with Auth0 security
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative z-10">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        <span className="text-primary">→</span> Project Overview
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        An autonomous multi-agent AI system that automates ESG (Environmental, Social, Governance) compliance for small and medium businesses. Features 5 core agents handling regulation research, ESG data collection, emissions calculations, report generation (GRI/SASB/TCFD formats), and permission-aware RAG chat. All secured end-to-end with Auth0 for AI Agents - every agent action is authenticated, authorized, and audited.
                      </p>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></div>
                    
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        <span className="text-primary">→</span> Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Auth0", "Next.js", "Node.js", "Google Gemini", "LangChain", "BigQuery", "Pinecone"].map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="group-hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        asChild
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      >
                        <a
                          href="https://dev.to/omkar598/esg-copilot-17fn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read Article
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      >
                        <a
                          href="https://dev.to/challenges/auth0-2025-10-08"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Challenge
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Job Match Analyzer Section */}
        <section ref={jobMatchRef} id="job-match" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Job Match Analyzer</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Recruiters: Paste a job posting to see how well Omkar matches
                your role. Get instant AI-powered analysis with skill matching
                and recommendations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <JobMatchAnalyzer />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to start your next project? Let's discuss how we can work
                together to bring your ideas to life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ContactForm />
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                  <p className="text-muted-foreground mb-8">
                    I'm always excited to discuss new opportunities, interesting
                    projects, and potential collaborations. Whether you're
                    looking for a full-time developer, freelance help, or just
                    want to chat about technology, I'd love to hear from you.
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      icon: <Mail className="w-6 h-6" />,
                      title: "Email",
                      content: "omkardongre5@gmail.com",
                      link: "mailto:omkardongre5@gmail.com",
                      description: "Best for detailed discussions",
                    },
                    {
                      icon: <Github className="w-6 h-6" />,
                      title: "GitHub",
                      content: "github.com/omkardongre",
                      link: "https://github.com/omkardongre",
                      description: "Check out my latest code",
                    },
                    {
                      icon: <Linkedin className="w-6 h-6" />,
                      title: "LinkedIn",
                      content: "linkedin.com/in/omkar-dongre",
                      link: "https://www.linkedin.com/in/omkar-dongre-133942151",
                      description: "Professional networking",
                    },
                  ].map((contact, index) => (
                    <Card
                      key={index}
                      className="shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            {contact.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">
                              {contact.title}
                            </h4>
                            <a
                              href={contact.link}
                              className="text-primary hover:underline block mb-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {contact.content}
                            </a>
                            <p className="text-sm text-muted-foreground">
                              {contact.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Omkar Dongre</h3>
              <p className="text-muted-foreground mb-6">
                Fullstack Developer | Software Engineer
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                <a
                  href="mailto:omkardongre5@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/omkardongre"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/omkar-dongre-133942151"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2025 Omkar Dongre. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* AI Chat Assistant */}
        <AIChat />
      </div>
    </>
  );
}
