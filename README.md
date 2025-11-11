# 🚀 Modern Interactive Developer Portfolio

A professional, interactive developer portfolio showcasing projects, skills, and experience with smooth transitions and modern design.

## ✨ Features

### 📄 Core Sections
- **Home Page** - Hero section with smooth animations
- **About** - Personal introduction with feature highlights
- **Journey** - Career timeline with company milestones
- **Projects** - Showcase with live demos and tech stacks
- **Skills** - Tech stack display with visual indicators
- **Achievements** - Hackathon wins and accomplishments (Auth0 Hackathon 2025 - ESG Copilot)
- **Contact** - Functional form with validation
- **Experience** - Detailed company pages with tabs (Overview, Projects, Achievements, Skills, Learning)

### 🎨 Design & Interactivity
- Smooth page transitions with Framer Motion
- Dark/Light mode toggle
- Fully responsive design (mobile, tablet, desktop)
- Modern UI with glassmorphism effects
- Interactive hover states and transitions

### 🚀 Interactive Features
- **Achievements Section** - Hackathon wins with detailed project information
- **AI Chat Assistant** - Portfolio Q&A powered by Google Gemini 2.0 Flash
- **Job Match Analyzer** - AI-powered job matching tool for recruiters
- **GitHub Stats Integration** - Real-time GitHub activity display
- **Dark/Light Mode** - Theme toggle with persistent preferences
- **Glassmorphism Effects** - Modern UI with backdrop blur and transparency
- **Toast Notifications** - User feedback for form submissions

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion + ScrollReveal
- **Icons:** Lucide React

### AI & Backend
- **AI Model:** Google Gemini 2.0 Flash
- **API Routes:** Next.js API routes (chat, job-match, contact)

### Deployment
- **Hosting:** Vercel (recommended)

## 🚀 Getting Started

### Installation

```bash
# Clone and install
git clone <your-repo-url>
cd portfolio
npm install

# Setup environment (optional - for AI features)
cp .env.local.example .env.local
# Add GOOGLE_GENERATIVE_AI_API_KEY if using AI features

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/              # AI chat endpoint
│   │   ├── contact/           # Contact form endpoint
│   │   └── job-match/         # Job match analyzer endpoint
│   ├── experience/            # Dynamic experience pages
│   ├── projects/              # Dynamic project pages
│   ├── layout.tsx             # Root layout with theme provider
│   └── page.tsx               # Main portfolio page
├── components/
│   ├── ai-chat.tsx            # AI chat assistant
│   ├── contact-form.tsx       # Contact form with validation
│   ├── github-stats.tsx       # GitHub stats display
│   ├── job-match-analyzer.tsx # Job matching tool
│   ├── mobile-menu.tsx        # Mobile navigation
│   ├── theme-toggle.tsx       # Dark/light mode toggle
│   └── ui/                    # shadcn/ui components
├── lib/
│   └── utils.ts               # Utility functions
└── public/
    └── resume.pdf             # Resume file
```

## 🧪 Build & Deploy

```bash
npm run build    # Build for production
npm run start    # Test production build
npm run lint     # Check code quality
```

Deploy to Vercel with one click or use any hosting platform that supports Next.js.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
