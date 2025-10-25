# 🚀 Modern Interactive Developer Portfolio

A stunning, interactive developer portfolio showcasing projects, skills, and experience with smooth animations and modern design.

## ✨ Features

### 📄 Core Sections
- **Home Page** - Animated hero with canvas particles
- **Projects** - Showcase with live demos and tech stacks
- **Skills** - Tech stack display with visual indicators
- **Contact** - Functional form with validation

### 🎨 Design & Animations
- 60fps canvas particle effects
- Smooth page transitions with Framer Motion
- Dark/Light mode toggle
- Fully responsive design
- Modern glassmorphism UI

### 🚀 Bonus Features
- AI chat assistant for portfolio Q&A
- Job match analyzer tool
- Performance monitoring (FPS, Web Vitals)
- Toast notifications

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion + Canvas API
- **AI:** Google Gemini 2.0 Flash (optional features)
- **Deployment:** Vercel

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
│   ├── api/           # API routes (chat, job-match)
│   └── page.tsx       # Main portfolio page
├── components/
│   ├── hero-section.tsx
│   ├── contact-form.tsx
│   ├── ai-chat.tsx
│   └── ui/            # shadcn components
└── styles/
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
