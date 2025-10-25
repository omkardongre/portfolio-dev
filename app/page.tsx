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
import { HeroSection } from "@/components/hero-section";
import { AnimatedProjectCard } from "@/components/animated-project-card";
import { AIChat } from "@/components/ai-chat";
import { JobMatchAnalyzer } from "@/components/job-match-analyzer";
import { PageLoader } from "@/components/page-loader";
import { FeaturedProjectCard } from "@/components/featured-project-card";
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
      if (e.key === 'h' || e.key === 'H') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
          scrollToSection('home');
        }
      }
      // Press 'C' to go to contact
      if (e.key === 'c' || e.key === 'C') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
          scrollToSection('contact');
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
    if (!showContent || typeof window === 'undefined') return;
    
    // Dynamically import ScrollReveal only on client
    import('scrollreveal').then((ScrollReveal) => {
      const sr = ScrollReveal.default();
      
      const srConfig = {
        origin: 'bottom',
        distance: '20px',
        duration: 600,
        delay: 200,
        opacity: 0,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        reset: false,
      };
      
      const refs = [
        aboutRef,
        journeyRef,
        projectsRef,
        skillsRef,
        resumeRef,
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
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <>
      <PageLoader onComplete={() => setShowContent(true)} />
      <div 
        className="min-h-screen bg-background text-foreground" 
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s' }}
      >
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
              <MobileMenu activeSection={activeSection} onNavigate={scrollToSection} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with GSAP + 3D */}
      <HeroSection onNavigate={scrollToSection} />

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed mb-6">
                  With 2+ years of experience in software engineering at
                  companies like Sandvine and Bentley Systems, I've built a
                  strong foundation in C/C++ development and system-level
                  programming. My journey began with data plane systems and
                  database automation, where I honed my skills in Python and
                  Bash scripting.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Today, I'm passionate about modern fullstack development,
                  leveraging React, Next.js, and Express.js to create scalable
                  web applications. I enjoy bridging the gap between low-level
                  system knowledge and high-level application development.
                </p>
                <p className="text-lg leading-relaxed">
                  I'm actively seeking opportunities in backend, fullstack, or
                  software engineering roles where I can contribute to building
                  robust, scalable systems while continuing to grow and learn.
                </p>
              </CardContent>
            </Card>
          </motion.div>
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
                  year: "2020–2022",
                  company: "Sandvine",
                  slug: "sandvine",
                  role: "Software Engineer",
                  description:
                    "C/C++ development in data plane systems, working on high-performance network processing and traffic management solutions.",
                  icon: <Code className="w-6 h-6" />,
                  side: "left",
                  highlights: [
                    "40% performance improvement",
                    "5 patent applications",
                    "Outstanding performance rating",
                  ],
                },
                {
                  year: "2019–2020",
                  company: "Bentley Systems",
                  slug: "bentley",
                  role: "Software Engineering Intern",
                  description:
                    "Database script development and Selenium test automation, contributing to infrastructure and quality assurance processes.",
                  icon: <Database className="w-6 h-6" />,
                  side: "right",
                  highlights: [
                    "85% deployment time reduction",
                    "80% test automation coverage",
                    "Exceptional intern recognition",
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
                    className={`w-full max-w-md shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                      item.side === "left" ? "mr-8" : "ml-8"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
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
                    <CardContent>
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
              },
            ].map((project, index) => (
              <AnimatedProjectCard
                key={index}
                title={project.name}
                description={project.description}
                tech={project.tech}
                github={project.github}
                demo={project.demo}
                slug={project.slug}
                index={index}
              />
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
            <Card className="shadow-lg">
              <CardContent className="p-12">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Open Source Contributions
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <Card className="shadow-lg">
              <CardContent className="p-12">
                <div className="text-6xl mb-6">
                  <GitBranch className="w-16 h-16 mx-auto text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Active Contributor</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Contributing to open source projects in workflow automation and developer tooling.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-3">Featured Project</h4>
                  <a 
                    href="https://github.com/triggerdotdev/trigger.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-lg"
                  >
                    <GitBranch className="w-5 h-5" />
                    Trigger.dev
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Workflow automation platform • TypeScript, Node.js, React
                  </p>
                </div>

                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Improving developer experience and API design</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Code quality and performance improvements</span>
                  </p>
                </div>

                <p className="text-muted-foreground mt-8">
                  Follow my contributions on{' '}
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              </CardContent>
            </Card>
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
                skills: ["Docker", "Git", "MongoDB", "Firebase", "AWS EC2/ECS"],
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
            <Card className="shadow-lg">
              <CardContent className="p-12">
                <div className="text-6xl mb-6">📄</div>
                <h3 className="text-2xl font-bold mb-4">Download My Resume</h3>
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
              Recruiters: Paste a job posting to see how well Omkar matches your role. 
              Get instant AI-powered analysis with skill matching and recommendations.
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
                  projects, and potential collaborations. Whether you're looking
                  for a full-time developer, freelance help, or just want to
                  chat about technology, I'd love to hear from you.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: "Email",
                    content: "omkar.dongre@email.com",
                    link: "mailto:omkar.dongre@email.com",
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
                    content: "linkedin.com/in/omkardongre",
                    link: "https://linkedin.com/in/omkardongre",
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
                href="mailto:omkar.dongre@email.com"
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
                href="https://linkedin.com/in/omkardongre"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Omkar Dongre. All rights reserved.
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
