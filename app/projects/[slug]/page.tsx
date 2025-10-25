"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from '@/lib/gsap';
import { gsap } from 'gsap';
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Users,
  Video,
  Mic,
  Monitor,
  Layout,
  MessageSquare,
  Calendar,
  Search,
  Bell,
  Shield,
  Globe,
  Smartphone,
  Play,
  Utensils,
  UserCheck,
  ListChecks,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
  Server,
  ShoppingCart,
  CreditCard,
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
import { HeroBackground } from "@/components/hero-background";

const projectsData = {
  socialhub: {
    name: "SocialHub",
    tagline: "A Microservices-Based Social Media Platform",
    description:
      "SocialHub is a full-stack social media platform built with modern microservices architecture, designed for scalability, maintainability, and cloud-native deployment. It serves as a production-ready template for building distributed systems.",
    longDescription: `SocialHub is a production-ready, cloud-native social media platform architected with microservices and an API Gateway pattern. It includes real-time chat, notifications, media uploads, and activity feeds. Backend services are containerized, event-driven, and designed for auto-scaling. The platform is fully automated with CI/CD pipelines and Infrastructure as Code for AWS deployment. External systems like RabbitMQ and Redis are integrated for messaging and asynchronous processing. The project is a robust demonstration of distributed system design, DevOps, and cloud engineering best practices.`,
    tech: [
      "Next.js 14",
      "Tailwind CSS",
      "React Query",
      "Socket.IO",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "AWS ECS",
      "Terraform",
      "RabbitMQ",
      "Redis",
      "GitHub Actions",
    ],
    category: "Full-Stack Microservices Platform",
    timeline: "2 months",
    team: "Solo Project",
    status: "Production",
    github: "https://github.com/omkardongre/socialhub",
    demo: "",
    images: [
      "/socialhub/socialhub-01.png",
      "/socialhub/socialhub-02.png",
      "/socialhub/socialhub-03.png",
      "/socialhub/socialhub-04.png",
      "/socialhub/socialhub-05.png",
    ],
    features: [
      {
        icon: <Cloud className="w-6 h-6" />,
        title: "Modern Microservices Architecture",
        description:
          "API Gateway pattern, isolated services for Auth, User, Posts, Media, Notifications, and Chat.",
      },
      {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Real-time Interactions",
        description:
          "Live chat, notifications, and activity feeds with Socket.IO and event-driven backend.",
      },
      {
        icon: <Database className="w-6 h-6" />,
        title: "Media Handling",
        description:
          "Image and video uploads with backend processing and cloud storage.",
      },
      {
        icon: <Server className="w-6 h-6" />,
        title: "Scalable Backend",
        description:
          "Containerized services with Docker, auto-scaling on AWS ECS, and Infrastructure as Code.",
      },
      {
        icon: <Bell className="w-6 h-6" />,
        title: "Event-Driven Communication",
        description:
          "RabbitMQ for asynchronous events (e.g., post created, user followed).",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Robust CI/CD & Monitoring",
        description: "Automated testing, deployment (GitHub Actions).",
      },
      {
        icon: <Code className="w-6 h-6" />,
        title: "Infrastructure as Code",
        description:
          "Terraform scripts for AWS provisioning and reproducible deployments.",
      },
    ],
    architecture: {
      frontend:
        "Next.js 14 (React) with Tailwind CSS, React Query for data fetching, Socket.IO for real-time updates.",
      apiGateway:
        "Express.js API Gateway routes all client requests to backend microservices, handling authentication and rate-limiting.",
      microservices:
        "Auth, User, Post, Media, Notification, and Chat services, each as a separate NestJS app with its own database.",
      database:
        "PostgreSQL for all core services (user, post, media, etc). Each service has its own DB for decoupling.",
      messaging:
        "RabbitMQ as event bus for asynchronous communication between services (e.g., post events, notifications).",
      notificationInfra:
        "Notification service uses Redis-backed Bull queue for async email delivery, ensuring reliability and retries.",
      containerization:
        "All services and frontend are Dockerized. Docker Compose for local dev, AWS ECS for production orchestration.",
      provisioning:
        "Terraform scripts for AWS infrastructure: ECS, RDS, VPC, S3, RabbitMQ, IAM, etc.",
      ciCd: "GitHub Actions for automated build, test, and deployment pipelines.",
      monitoring: "AWS CloudWatch",
      external:
        "RabbitMQ for event-driven flows, Redis for notification queues and email reliability.",
    },
    challenges: [
      {
        problem:
          "Designing a scalable, maintainable microservices system from scratch (solo)",
        solution:
          "Planned clear service boundaries, used API Gateway pattern, and containerized each service for independent deployment.",
      },
      {
        problem:
          "Implementing reliable, asynchronous communication between services",
        solution:
          "Integrated RabbitMQ for event-driven flows and Redis-backed Bull queue for decoupled email notifications.",
      },
      {
        problem:
          "Automating infrastructure and deployment for cloud-native operation",
        solution:
          "Used Terraform for IaC, Docker for containerization, and GitHub Actions for full CI/CD pipelines.",
      },
      {
        problem:
          "Ensuring observability and fast debugging in a distributed system",
        solution:
          "Adopted AWS CloudWatch for monitoring, centralized logs, and health checks for all services.",
      },
    ],
    metrics: {
      performance:
        "Containerized microservices, real-time features, and automated scaling for high availability.",
      devops:
        "100% IaC for infra, automated CI/CD, local dev with Docker Compose, production on AWS ECS.",
      observability: "Live monitoring with AWS CloudWatch",
      extensibility:
        "Template codebase for launching new microservices or features quickly.",
    },
  },
  "video-sharing": {
    name: "Video Sharing Platform",
    tagline:
      "Cross-Platform Video Sharing with AI, Real-Time Recording, and Dynamic CMS",
    description:
      "A full-stack video sharing platform featuring real-time recording, AI-powered transcription and summarization, dynamic CMS integration, and seamless collaboration across web and desktop.",
    longDescription: `The Video Sharing Platform is a modern, cross-platform solution for uploading, recording, and sharing videos. The system includes a Next.js web app, an Electron-based desktop recorder, and a Node.js video processing backend. Users can record or upload videos, which are then processed with AI for transcription and summaries. Admins can dynamically feature videos using a WIX-powered CMS, enabling content updates without code changes. The backend supports chunked uploads, S3 storage, and integrates with AssemblyAI and Gemini for advanced video intelligence. The project demonstrates full-stack engineering, real-time data flow, and cloud-native deployment.`,
    tech: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "Radix UI",
      "Socket.IO",
      "Electron",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "AWS S3 & CloudFront",
      "AssemblyAI",
      "Google Gemini",
      "Voiceflow",
      "WIX CMS",
      "Clerk",
      "Docker",
      "Bun",
    ],
    category: "Full-Stack Video Platform",
    timeline: "3 months",
    team: "Solo Project",
    status: "Production",
    github: "https://github.com/omkardongre/Video-Sharing-Web",
    demo: "",
    images: [
      "/videoSharing/videoSharing-01.png",
      "/videoSharing/videoSharing-02.png",
      "/videoSharing/videoSharing-03.png",
      "/videoSharing/videoSharing-04.png",
      "/videoSharing/videoSharing-05.png",
      "/videoSharing/videoSharing-06.png",
      "/videoSharing/videoSharing-07.png",
    ],
    features: [
      {
        icon: <Video className="w-6 h-6" />,
        title: "Real-Time Recording & Uploads",
        description:
          "Record or upload videos directly from the web or desktop app, with chunked uploads and real-time progress.",
      },
      {
        icon: <Mic className="w-6 h-6" />,
        title: "AI-Powered Transcription & Summarization",
        description:
          "Automatic video transcription and AI-generated summaries using AssemblyAI and Gemini.",
      },
      {
        icon: <Monitor className="w-6 h-6" />,
        title: "Cross-Platform Desktop App",
        description:
          "Electron-based recorder for high-quality screen and webcam capture, tightly integrated with the platform.",
      },
      {
        icon: <Cloud className="w-6 h-6" />,
        title: "Cloud Storage & Streaming",
        description:
          "Videos stored on AWS S3 and streamed securely via CloudFront for fast, reliable playback.",
      },
      {
        icon: <Layout className="w-6 h-6" />,
        title: "Dynamic CMS Integration (WIX)",
        description:
          "Admins can feature or update videos dynamically via WIX CMS—no code changes or redeploys required.",
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Team Collaboration",
        description:
          "Workspaces, folders, member invites, and activity feeds for organized team video management.",
      },
      {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "AI Q&A and Chatbot",
        description:
          "Voiceflow-powered chatbot for video-related Q&A and smart content search.",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Secure Auth & Notifications",
        description:
          "Clerk authentication, protected routes, and email notifications for video events.",
      },
    ],
    architecture: {
      frontend:
        "Next.js 15 (React 19) with Tailwind CSS, Radix UI, and Socket.IO for real-time updates. Video playback via CloudFront.",
      desktop:
        "Electron + React app for recording and chunked video uploads via WebSocket.",
      backend:
        "Node.js/Express server for video upload, processing pipeline (transcription, AI summary), and S3 integration.",
      database:
        "PostgreSQL managed with Prisma ORM for all user, video, and workspace data.",
      cms: "WIX CMS integration for dynamic featured video management. Admins update video IDs in WIX; the app fetches these and displays corresponding videos.",
      ai: "AssemblyAI for transcription, Gemini for summarization, Voiceflow for chatbot/Q&A.",
      storage:
        "Videos stored on AWS S3, streamed via CloudFront. Metadata in PostgreSQL.",
      auth: "Clerk for authentication and session management.",
      devops:
        "Docker for containerization, Bun for fast JS runtime in web app, environment-based config for local/prod.",
      external:
        "WIX for CMS, AssemblyAI & Gemini for AI, Voiceflow for chatbot, AWS for storage/streaming.",
    },
    challenges: [
      {
        problem:
          "Ensuring reliable, real-time video uploads from both web and desktop clients, even on unstable networks.",
        solution:
          "Implemented chunked uploads with Socket.IO, reconnection logic, and local fallback for failed chunks.",
      },
      {
        problem:
          "Delays in video availability due to sequential backend processing (transcription, summary, S3 upload).",
        solution:
          "Optimized pipeline steps and provided user feedback on processing status. Documented limitations for transparency.",
      },
      {
        problem:
          "Allowing non-technical admins to feature or update videos without code changes.",
        solution:
          "Integrated WIX CMS to manage featured video IDs, enabling dynamic dashboard content updates.",
      },
      {
        problem:
          "Integrating multiple third-party AI and cloud services securely and efficiently.",
        solution:
          "Centralized environment configuration, secure API key management, and robust error handling.",
      },
    ],
    metrics: {
      performance:
        "Supports real-time uploads, AI processing, and fast streaming for hundreds of videos.",
      extensibility:
        "Modular codebase allows easy addition of new features, AI integrations, or storage providers.",
      observability:
        "Logging and error handling in all major services; clear user feedback on upload/processing state.",
    },
  },
  "food-ordering-app": {
    name: "Food Ordering App",
    tagline: "Full-Stack Food Delivery Platform with Payments & Admin",
    description:
      "A modern food ordering platform where users can browse restaurants, place orders, and pay online. Restaurant owners can manage menus and track orders, with secure authentication and real payment integration.",
    longDescription: `Food Ordering App is a production-ready, full-stack platform for restaurant discovery and food delivery. It supports user authentication (Auth0), menu and restaurant management, a shopping cart, real-time order status, and secure Stripe payments. The backend is built with Node.js/Express and MongoDB Atlas, while the frontend uses React, TypeScript, and Tailwind CSS. The project demonstrates best practices in API design, authentication, cloud deployment, and third-party integrations, and is fully deployed using Vercel (frontend) and Render (backend).`,
    tech: [
      "React (TypeScript)",
      "Tailwind CSS",
      "React Query",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Stripe",
      "Cloudinary",
      "Auth0",
      "Vercel",
      "Render",
    ],
    category: "Full-Stack Web Application",
    timeline: "3 weeks",
    team: "Solo Project",
    status: "Production",
    github: "https://github.com/omkardongre/Food-Ordering-App",
    demo: "https://restaurant.omkard.site/",
    images: [
      "/foodOrdering/foodOrdering-01.png",
      "/foodOrdering/foodOrdering-02.png",
      "/foodOrdering/foodOrdering-03.png",
      "/foodOrdering/foodOrdering-04.png",
      "/foodOrdering/foodOrdering-05.png",
      "/foodOrdering/foodOrdering-06.png",
      "/foodOrdering/foodOrdering-07.png",
      "/foodOrdering/foodOrdering-08.png",
    ],
    features: [
      {
        icon: <Utensils className="w-6 h-6" />,
        title: "Restaurant Discovery & Menu Management",
        description:
          "Users can browse, search, and filter restaurants. Owners can manage restaurant profiles and menu items, including image uploads via Cloudinary.",
      },
      {
        icon: <ShoppingCart className="w-6 h-6" />,
        title: "Shopping Cart & Checkout",
        description:
          "Add/remove items to cart, view order summary, and proceed to secure checkout with real-time price updates.",
      },
      {
        icon: <CreditCard className="w-6 h-6" />,
        title: "Stripe Payment Integration",
        description:
          "Seamless online payments using Stripe test mode, including webhook handling for order status updates.",
      },
      {
        icon: <UserCheck className="w-6 h-6" />,
        title: "Auth0 Authentication",
        description:
          "Secure login/signup for users and restaurant owners, with JWT-based API protection.",
      },
      {
        icon: <ListChecks className="w-6 h-6" />,
        title: "Order Tracking & Management",
        description:
          "View real-time order status, order history, and manage incoming orders from the restaurant dashboard.",
      },
      {
        icon: <Cloud className="w-6 h-6" />,
        title: "Cloud-Native Deployment",
        description:
          "Frontend deployed on Vercel, backend on Render, database on MongoDB Atlas. Scalable and production-ready.",
      },
    ],
    architecture: {
      frontend:
        "React (TypeScript) with Vite, Tailwind CSS, React Query for data fetching, Auth0 for authentication, Stripe for payments.",
      backend:
        "Node.js/Express REST API, JWT validation with Auth0, Stripe webhook handling, image uploads to Cloudinary, deployed on Render.",
      database:
        "MongoDB Atlas for persistent storage of users, restaurants, orders, and menu items.",
      payment:
        "Stripe Checkout for payment processing, webhook endpoint for order status updates.",
      authentication:
        "Auth0 Universal Login for users and owners, JWT validation in backend.",
      deployment:
        "Frontend on Vercel, backend on Render, environment variables managed per environment.",
      imageUpload:
        "Cloudinary integration for secure image storage and fast CDN delivery.",
    },
    challenges: [
      {
        problem:
          "Synchronizing order/payment status between Stripe and the app",
        solution:
          "Implemented robust webhook handling and order state updates on payment events.",
      },
      {
        problem: "Securing API endpoints for both users and restaurant admins",
        solution:
          "Used Auth0 for authentication and fine-grained JWT validation in the backend.",
      },
      {
        problem: "Making the app cloud-ready and demo-friendly",
        solution:
          "Deployed using Vercel and Render, with environment-specific configuration and public demo/test mode.",
      },
      {
        problem: "Handling image uploads and storage efficiently",
        solution:
          "Integrated Cloudinary for seamless, scalable image management.",
      },
    ],
    metrics: {
      performance: "Fast, responsive UI with code-splitting and CDN assets.",
      extensibility:
        "Modular codebase for easy addition of new features (e.g., reviews, coupons, delivery tracking).",
    },
  },
};

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const project = projectsData[params.slug as keyof typeof projectsData];
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }

    if (featuresRef.current) {
      gsap.from(featuresRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  // Keyboard navigation for lightbox
  const handleLightboxKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") {
        goToPrevImage();
      } else if (e.key === "ArrowRight") {
        goToNextImage();
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    },
    [lightboxOpen, activeImage, project.images]
  );

  const goToPrevImage = useCallback(() => {
    setActiveImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  const goToNextImage = useCallback(() => {
    setActiveImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, [project.images.length]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Project Not Found
          </h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      <HeroBackground />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              {project.demo && (
                <Button size="sm" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge variant="secondary" className="text-sm">
                {project.category}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {project.status}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-6">
              {project.tagline}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Timeline
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.timeline}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Team
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.team}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Technologies
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.tech.length} Technologies
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Project Screenshots
            </h2>

            {/* Main Image with Lightbox Trigger */}
            <div
              className="mb-8 flex justify-center cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={project.images[activeImage] || "/placeholder.svg"}
                alt={`${project.name} screenshot ${activeImage + 1}`}
                className="max-w-full h-96 object-contain rounded-xl shadow-2xl"
                style={{ transition: "box-shadow 0.2s" }}
              />
            </div>

            {/* Lightbox Modal */}
            <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 animate-fadeIn" />
                <Dialog.Content
                  className="fixed inset-0 flex items-center justify-center z-50 focus:outline-none"
                  onKeyDown={handleLightboxKey}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <button
                      onClick={goToPrevImage}
                      className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-50"
                      aria-label="Previous image"
                      tabIndex={0}
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <img
                      src={project.images[activeImage] || "/placeholder.svg"}
                      alt={`${project.name} screenshot ${activeImage + 1}`}
                      className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl bg-black"
                      style={{ background: "#000" }}
                    />
                    <button
                      onClick={goToNextImage}
                      className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-50"
                      aria-label="Next image"
                      tabIndex={0}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => setLightboxOpen(false)}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-50"
                      aria-label="Close"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    activeImage === index
                      ? "ring-4 ring-blue-500 shadow-lg"
                      : "hover:shadow-md hover:scale-105"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.name} thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.longDescription}
                    </p>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Technology Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm px-3 py-1"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.metrics && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Key Metrics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(project.metrics).map(
                            ([key, value], index) => (
                              <div
                                key={index}
                                className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                              >
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 capitalize mb-1">
                                  {key}
                                </h4>
                                <p className="text-blue-700 dark:text-blue-300">
                                  {value}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="features" className="space-y-8">
              <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, index) => (
                  <Card
                    key={index}
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Technical Architecture
                    </CardTitle>
                    <CardDescription>
                      Detailed breakdown of the system architecture and
                      technology choices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(project.architecture).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-500 pl-4"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize mb-2">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {value}
                          </p>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {project.challenges.map((challenge, index) => (
                  <Card key={index} className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-red-600 dark:text-red-400">
                        Challenge #{index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Problem:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {challenge.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Solution:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {challenge.solution}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action
      {project.demo && (
        <section className="py-16 bg-blue-600 dark:bg-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Interested in This Project?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Check out the live demo or explore the source code on GitHub
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Live Demo
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Source Code
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )} */}
    </div>
  );
}
