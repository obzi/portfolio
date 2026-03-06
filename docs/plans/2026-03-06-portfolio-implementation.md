# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark premium portfolio website for Tomáš Obzina, Full-Stack Web Developer, using Vite + React + TypeScript + Tailwind CSS + Framer Motion.

**Architecture:** Single-page React app with React Router v6 for client-side routing. All pages are components rendered via router. EmailJS handles contact form submissions without a backend. Animations via Framer Motion with scroll-triggered reveals.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v3, Framer Motion, React Router v6, EmailJS, react-type-animation, lucide-react (icons)

---

### Task 1: Project Scaffold

**Files:**
- Create: `D:/Web Moderni/` (project root)

**Step 1: Scaffold Vite + React + TypeScript project**

```bash
cd "D:/Web Moderni"
yarn create vite . --template react-ts
```
Answer: "Current directory is not empty. Remove existing files and continue?" → y

**Step 2: Install dependencies**

```bash
yarn add react-router-dom framer-motion react-type-animation lucide-react @emailjs/browser
yarn add -D tailwindcss postcss autoprefixer @types/node
yarn dlx tailwindcss init -p
```

**Step 3: Configure Tailwind — edit `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0c068',
          dark: '#a07030',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          surface: '#111111',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #c9a84c33' },
          to: { boxShadow: '0 0 40px #c9a84c66' },
        },
      },
    },
  },
  plugins: [],
}
```

**Step 4: Edit `src/index.css` — replace all content**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: #0a0a0a;
    color: #ffffff;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #111111;
  }
  ::-webkit-scrollbar-thumb {
    background: #c9a84c;
    border-radius: 3px;
  }
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, #c9a84c, #e0c068, #c9a84c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .border-gradient {
    border: 1px solid transparent;
    background: linear-gradient(#1a1a1a, #1a1a1a) padding-box,
                linear-gradient(135deg, #c9a84c, #2a2a2a) border-box;
  }
  .glass {
    backdrop-filter: blur(12px);
    background: rgba(26, 26, 26, 0.8);
  }
}
```

**Step 5: Edit `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
})
```

**Step 6: Run dev server to verify scaffold works**

```bash
yarn dev
```
Expected: Server starts on http://localhost:5173

**Step 7: Commit**

```bash
cd "D:/Web Moderni"
git init
git add .
git commit -m "feat: scaffold Vite + React + TS + Tailwind project"
```

---

### Task 2: App Shell — Router + Layout

**Files:**
- Create: `src/App.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/PageTransition.tsx`
- Create: `src/pages/Home.tsx`
- Create: `src/pages/About.tsx`
- Create: `src/pages/Services.tsx`
- Create: `src/pages/Pricing.tsx`
- Create: `src/pages/Contact.tsx`
- Create: `src/pages/Portfolio.tsx`

**Step 1: Create `src/App.tsx`**

```tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import Portfolio from '@/pages/Portfolio'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}
```

**Step 2: Create `src/components/PageTransition.tsx`**

```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
```

**Step 3: Create `src/components/Navbar.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Domů' },
  { path: '/about', label: 'O mně' },
  { path: '/services', label: 'Služby' },
  { path: '/pricing', label: 'Ceník' },
  { path: '/contact', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-dark-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-gradient">TO</span>
          <span className="text-white/60 text-sm font-light hidden sm:block">Tomáš Obzina</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                location.pathname === link.path ? 'text-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-4 py-2 border border-gold text-gold text-sm font-medium rounded hover:bg-gold hover:text-dark transition-all duration-200"
          >
            Kontaktujte mě
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70 hover:text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-dark-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2 border-b border-dark-border last:border-0 ${
                    location.pathname === link.path ? 'text-gold' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
```

**Step 4: Create `src/components/Footer.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-dark-border bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-gradient">TO</span>
          <span className="text-white/40 text-sm">© {year} Tomáš Obzina</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/obzi" target="_blank" rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors">
            <Github size={18} />
          </a>
          <a href="mailto:t.obzina81@gmail.com"
            className="text-white/40 hover:text-gold transition-colors">
            <Mail size={18} />
          </a>
        </div>
        <div className="flex gap-6 text-sm text-white/40">
          <Link to="/about" className="hover:text-gold transition-colors">O mně</Link>
          <Link to="/services" className="hover:text-gold transition-colors">Služby</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">Kontakt</Link>
        </div>
      </div>
    </footer>
  )
}
```

**Step 5: Create placeholder pages (Home, About, Services, Pricing, Contact, Portfolio) — temporary stubs**

Each page stub (`src/pages/Home.tsx` etc.):
```tsx
import PageTransition from '@/components/PageTransition'
export default function Home() {
  return <PageTransition><div className="pt-20 min-h-screen flex items-center justify-center text-white">Home</div></PageTransition>
}
```
(Repeat for About, Services, Pricing, Contact, Portfolio with their respective names)

**Step 6: Commit**

```bash
git add .
git commit -m "feat: app shell with router, navbar, footer, page transitions"
```

---

### Task 3: Home Page — Hero Section

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/components/ParticleBackground.tsx`
- Create: `src/components/ScrollIndicator.tsx`

**Step 1: Create `src/components/ParticleBackground.tsx`**

```tsx
import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}
```

**Step 2: Replace `src/pages/Home.tsx` with full hero**

```tsx
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import { ArrowDown, Code2, Layers, Zap } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ParticleBackground from '@/components/ParticleBackground'

const stats = [
  { label: 'Projektů dokončeno', value: '50+' },
  { label: 'Spokojených klientů', value: '30+' },
  { label: 'Let zkušeností', value: '8+' },
]

const highlights = [
  { icon: Code2, text: 'Čistý kód' },
  { icon: Layers, text: 'Moderní stack' },
  { icon: Zap, text: 'Rychlá dodávka' },
]

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Dostupný pro nové projekty
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
          >
            Tomáš <span className="text-gradient">Obzina</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white/60 mb-6 h-8"
          >
            <TypeAnimation
              sequence={[
                'Full-Stack Developer',
                2000,
                'React & Node.js Specialista',
                2000,
                'UI/UX Nadšenec',
                2000,
                'Váš technologický partner',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mb-12"
          >
            Vytvářím moderní webové aplikace, které spojují krásný design s výkonnou technologií.
            Od nápadu po spuštění — s precizností a péčí o každý detail.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/pricing"
              className="px-8 py-4 bg-gold text-dark font-semibold rounded hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-gold/40"
            >
              Zobrazit ceník
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border border-dark-border text-white/70 font-medium rounded hover:border-gold hover:text-gold transition-all duration-200"
            >
              Zjistit více o mně
            </Link>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center gap-8 mb-16"
          >
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
                <Icon size={16} className="text-gold" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gradient font-display">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* Brief intro below hero */}
      <section className="py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold mb-6"
          >
            Proměním vaši vizi v <span className="text-gradient">digitální realitu</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg leading-relaxed mb-8"
          >
            Specializuji se na vývoj webových aplikací na míru — od jednoduchých prezentačních
            webů po komplexní SaaS platformy. Dbám na výkon, bezpečnost a skvělý uživatelský zážitek.
          </motion.p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium"
          >
            Prozkoumat mé služby →
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
```

**Step 3: Verify page renders correctly**

```bash
yarn dev
```
Navigate to http://localhost:5173 and verify hero loads with particles and typing animation.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: home page with hero, particles, typing animation"
```

---

### Task 4: About Page

**Files:**
- Modify: `src/pages/About.tsx`
- Create: `src/components/SectionHeader.tsx`
- Create: `src/components/AnimatedSection.tsx`

**Step 1: Create `src/components/SectionHeader.tsx`**

```tsx
import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ label, title, subtitle, className = '' }: Props) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gold text-sm font-medium tracking-widest uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display text-4xl md:text-5xl font-bold text-white mt-2"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg mt-4 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
```

**Step 2: Create `src/components/AnimatedSection.tsx`**

```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Step 3: Replace `src/pages/About.tsx` with full content**

```tsx
import { motion } from 'framer-motion'
import { Code2, Database, Globe, Server, Smartphone, Cpu } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'

const skills = [
  { name: 'React / Next.js', level: 95, icon: Code2 },
  { name: 'TypeScript', level: 90, icon: Code2 },
  { name: 'Node.js / Express', level: 88, icon: Server },
  { name: 'PostgreSQL / MongoDB', level: 82, icon: Database },
  { name: 'REST API / GraphQL', level: 85, icon: Globe },
  { name: 'React Native', level: 70, icon: Smartphone },
  { name: 'Docker / DevOps', level: 72, icon: Cpu },
]

const timeline = [
  {
    year: '2024–nyní',
    role: 'Senior Full-Stack Developer',
    company: 'Freelance',
    desc: 'Vývoj webových aplikací na míru pro klienty z různých odvětví. Specialista na React a Node.js ekosystém.',
  },
  {
    year: '2020–2024',
    role: 'Full-Stack Developer',
    company: 'Tech Startup',
    desc: 'Vývoj a správa SaaS platformy. Zodpovědný za frontend architekturu a API design.',
  },
  {
    year: '2017–2020',
    role: 'Frontend Developer',
    company: 'Digital Agency',
    desc: 'Tvorba webových prezentací a e-commerce řešení pro klienty. Práce s React, Vue.js a WordPressem.',
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Tailwind', 'GraphQL',
]

export default function About() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        {/* Header */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              label="O mně"
              title='Vítejte, jsem <span class="text-gradient">Tomáš Obzina</span>'
              subtitle="Full-Stack Developer s vášní pro čistý kód a skvělý uživatelský zážitek"
            />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <AnimatedSection>
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden border-gradient">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                      alt="Tomáš Obzina"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-dark-card border border-gold/30 rounded-xl px-4 py-3 shadow-xl">
                    <div className="text-gold font-bold text-lg">8+ let</div>
                    <div className="text-white/50 text-xs">zkušeností</div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Bio */}
              <AnimatedSection delay={0.2}>
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Váš technologický partner
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Jsem full-stack developer se sídlem v České republice s více než 8 lety
                    zkušeností v oblasti vývoje webových aplikací. Specializuji se na moderní
                    JavaScript ekosystém a rád řeším komplexní technologické výzvy.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    Věřím, že skvělý software není jen o funkčnosti — je o eleganci řešení,
                    výkonu a uživatelském zážitku. Každý projekt přistupuji s maximální
                    pečlivostí a důrazem na kvalitu.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-card border border-dark-border text-white/60 text-sm rounded-full hover:border-gold/50 hover:text-gold transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-20 px-6 bg-dark-surface">
          <div className="max-w-4xl mx-auto">
            <SectionHeader label="Dovednosti" title="Technologie a <span class='text-gradient'>expertíza</span>" />
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <AnimatedSection key={skill.name} delay={i * 0.05}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center flex-shrink-0">
                      <skill.icon size={18} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-white text-sm font-medium">{skill.name}</span>
                        <span className="text-white/40 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-dark-card rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeader label="Zkušenosti" title='Moje <span class="text-gradient">kariéra</span>' />
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-dark-border" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="pl-20 relative">
                      <div className="absolute left-6 top-1 w-4 h-4 rounded-full border-2 border-gold bg-dark" />
                      <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-gold/30 transition-colors">
                        <div className="text-gold text-sm font-medium mb-1">{item.year}</div>
                        <div className="text-white font-semibold text-lg">{item.role}</div>
                        <div className="text-white/50 text-sm mb-3">{item.company}</div>
                        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: about page with skills, timeline, bio"
```

---

### Task 5: Services Page

**Files:**
- Modify: `src/pages/Services.tsx`

**Step 1: Replace `src/pages/Services.tsx`**

```tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code2, Server, Smartphone, BarChart2, Shield, Rocket } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'

const services = [
  {
    icon: Code2,
    title: 'Frontend Development',
    desc: 'Moderní, rychlé a responzivní webové aplikace s důrazem na uživatelský zážitek. React, Next.js, TypeScript — vše s perfektní péčí o detail.',
    features: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion animace', 'SEO optimalizace'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Robustní serverová řešení a API. Node.js, databáze, autentizace, integrace třetích stran — vše navrženo pro výkon a škálovatelnost.',
    features: ['Node.js / Express', 'REST API & GraphQL', 'PostgreSQL / MongoDB', 'Redis cache', 'JWT autentizace'],
  },
  {
    icon: Smartphone,
    title: 'Full-Stack Aplikace',
    desc: 'Kompletní webové aplikace od databáze po uživatelské rozhraní. Jeden kontaktní bod pro celý projekt — rychlost, konzistence, kvalita.',
    features: ['End-to-end řešení', 'SaaS platformy', 'E-commerce', 'Admin panely', 'Real-time funkce'],
  },
  {
    icon: BarChart2,
    title: 'Technický audit & Optimalizace',
    desc: 'Analýza stávajícího projektu, odhalení bottlenecků a návrh zlepšení. Performance audit, code review, refactoring.',
    features: ['Lighthouse audit', 'Core Web Vitals', 'Code review', 'Refactoring', 'Bezpečnostní audit'],
  },
  {
    icon: Shield,
    title: 'Správa & Údržba',
    desc: 'Dlouhodobá spolupráce, pravidelné aktualizace, monitoring a rychlé řešení problémů. Váš web v bezpečných rukou.',
    features: ['Monitoring 24/7', 'Pravidelné zálohy', 'Aktualizace závislostí', 'Bug fixing', 'Technická podpora'],
  },
  {
    icon: Rocket,
    title: 'Konzultace & Poradenství',
    desc: 'Technologická strategie, výběr správného stacku, architektura projektu. Pomáhám firmám činit správná technická rozhodnutí.',
    features: ['Tech stack poradenství', 'Architektura systému', 'Project kickoff', 'Code review', 'Mentoring týmu'],
  },
]

export default function Services() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="Služby"
              title='Co pro vás <span class="text-gradient">mohu udělat</span>'
              subtitle="Komplexní webový vývoj přizpůsobený vašim potřebám — od malých projektů po enterprise řešení"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <AnimatedSection key={service.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-dark-card border border-dark-border rounded-2xl p-6 h-full hover:border-gold/30 transition-colors group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                      <service.icon size={22} className="text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4">{service.desc}</p>
                    <ul className="space-y-1.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-white/40 text-sm">
                          <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center mt-16">
              <p className="text-white/50 mb-6">Máte specifický požadavek nebo nejste si jistí, co přesně potřebujete?</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-semibold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
              >
                Nezávazná konzultace zdarma →
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: services page with 6 service cards"
```

---

### Task 6: Pricing Page + EmailJS Contact Form

**Files:**
- Modify: `src/pages/Pricing.tsx`
- Create: `src/components/ContactForm.tsx`
- Create: `src/config/emailjs.ts`

**Step 1: Create `src/config/emailjs.ts`**

```ts
// EmailJS configuration
// Create free account at emailjs.com, set up a service + template
// Replace with your actual values from emailjs.com dashboard
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
}
```

**Step 2: Create `src/components/ContactForm.tsx`**

```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { EMAILJS_CONFIG } from '@/config/emailjs'

interface Props {
  selectedPackage?: string
}

export default function ContactForm({ selectedPackage = '' }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    package: selectedPackage,
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          package: form.package,
          message: form.message,
          to_email: 't.obzina81@gmail.com',
        },
        EMAILJS_CONFIG.publicKey
      )
      setStatus('success')
      setForm({ name: '', email: '', package: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-sm mb-2">Vaše jméno *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jan Novák"
            className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-white/50 text-sm mb-2">E-mail *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jan@firma.cz"
            className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-white/50 text-sm mb-2">Zájem o balíček</label>
        <select
          name="package"
          value={form.package}
          onChange={handleChange}
          className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
        >
          <option value="">Vyberte balíček (nepovinné)</option>
          <option value="Starter">Starter — 15 000–30 000 Kč</option>
          <option value="Pro">Pro — 30 000–70 000 Kč</option>
          <option value="Enterprise">Enterprise — od 70 000 Kč</option>
        </select>
      </div>
      <div>
        <label className="block text-white/50 text-sm mb-2">Popis projektu *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Popište váš projekt, cíle a požadavky..."
          className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-4">
          <CheckCircle size={20} />
          <span>Zpráva odeslána! Ozveme se do 24 hodin.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
          <AlertCircle size={20} />
          <span>Chyba odeslání. Zkuste znovu nebo napište přímo na t.obzina81@gmail.com</span>
        </div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gold text-dark font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 disabled:opacity-50"
      >
        <Send size={18} />
        {status === 'sending' ? 'Odesílám...' : 'Odeslat poptávku'}
      </motion.button>
    </form>
  )
}
```

**Step 3: Replace `src/pages/Pricing.tsx`**

```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

const packages = [
  {
    name: 'Starter',
    price: '15 000 – 30 000 Kč',
    desc: 'Ideální pro malé firmy a podnikatele, kteří potřebují profesionální webovou prezentaci.',
    features: [
      'Prezentační web (5–10 stránek)',
      'Responzivní design',
      'Základní SEO optimalizace',
      'Kontaktní formulář',
      'Nasazení na hosting',
      '1 měsíc bezplatné podpory',
    ],
    popular: false,
    cta: 'Začít s Starter',
  },
  {
    name: 'Pro',
    price: '30 000 – 70 000 Kč',
    desc: 'Pro firmy, které potřebují plnohodnotnou webovou aplikaci s vlastní logikou a integrací.',
    features: [
      'Webová aplikace / SaaS',
      'Uživatelská autentizace',
      'Databáze a API',
      'Admin panel',
      'Integrace platebních bran',
      'E-mail notifikace',
      'CI/CD pipeline',
      '3 měsíce podpory',
    ],
    popular: true,
    cta: 'Vybrat Pro',
  },
  {
    name: 'Enterprise',
    price: 'od 70 000 Kč',
    desc: 'Komplexní řešení pro větší projekty a firmy s vysokými nároky na výkon a škálovatelnost.',
    features: [
      'Komplexní systémy na míru',
      'Microservices architektura',
      'High-performance optimalizace',
      'Vlastní DevOps infrastruktura',
      'Bezpečnostní audit',
      'Load balancing & škálování',
      'SLA garance',
      '12 měsíců prioritní podpory',
    ],
    popular: false,
    cta: 'Kontaktujte mě',
  },
]

export default function Pricing() {
  const [selectedPackage, setSelectedPackage] = useState('')

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        {/* Packages */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="Ceník"
              title='Transparentní <span class="text-gradient">ceny</span>'
              subtitle="Každý projekt je unikátní. Uvedené rozsahy jsou orientační — finální cena závisí na rozsahu a specifikách vašeho projektu."
            />

            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <AnimatedSection key={pkg.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={`relative rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-b from-gold/10 to-dark-card border-2 border-gold shadow-2xl shadow-gold/10'
                        : 'bg-dark-card border border-dark-border hover:border-gold/30'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="flex items-center gap-1 bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
                          <Star size={10} fill="currentColor" /> Nejoblíbenější
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="font-display text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                      <div className="text-gradient font-bold text-xl mb-3">{pkg.price}</div>
                      <p className="text-white/50 text-sm leading-relaxed">{pkg.desc}</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                          <Check size={16} className="text-gold flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        setSelectedPackage(pkg.name)
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        pkg.popular
                          ? 'bg-gold text-dark hover:bg-gold-light shadow-lg shadow-gold/20'
                          : 'border border-dark-border text-white/70 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {pkg.cta}
                    </button>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="mt-12 text-center">
              <p className="text-white/40 text-sm">
                Ceny jsou bez DPH. Platba možná po etapách. Vždy dostanete detailní nabídku před zahájením práce.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact-form" className="py-20 px-6 bg-dark-surface">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              label="Poptávka"
              title='Nezávazná <span class="text-gradient">poptávka</span>'
              subtitle="Popište váš projekt a do 24 hodin se vám ozvu s nabídkou na míru."
            />
            <AnimatedSection>
              <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                <ContactForm selectedPackage={selectedPackage} />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: pricing page with packages and EmailJS contact form"
```

---

### Task 7: Contact Page

**Files:**
- Modify: `src/pages/Contact.tsx`

**Step 1: Replace `src/pages/Contact.tsx`**

```tsx
import { motion } from 'framer-motion'
import { Mail, Github, MapPin, Clock } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

const info = [
  { icon: Mail, label: 'E-mail', value: 't.obzina81@gmail.com', href: 'mailto:t.obzina81@gmail.com' },
  { icon: Github, label: 'GitHub', value: 'github.com/obzi', href: 'https://github.com/obzi' },
  { icon: MapPin, label: 'Lokace', value: 'Česká republika', href: null },
  { icon: Clock, label: 'Dostupnost', value: 'Po–Pá, 9:00–18:00', href: null },
]

export default function Contact() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2" />
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              label="Kontakt"
              title='Pojďme <span class="text-gradient">spolupracovat</span>'
              subtitle="Máte projekt, nápad nebo otázku? Rád si promluvíme. Obvykle reaguji do 24 hodin."
            />

            <div className="grid md:grid-cols-2 gap-12">
              {/* Info */}
              <AnimatedSection>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Napište mi</h3>
                    <p className="text-white/55 leading-relaxed">
                      Ať už hledáte vývojáře pro svůj projekt, potřebujete technickou konzultaci
                      nebo máte jakoukoliv otázku — neváhejte se ozvat.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {info.map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-gold" />
                        </div>
                        <div>
                          <div className="text-white/40 text-xs uppercase tracking-wider">{label}</div>
                          {href ? (
                            <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                              rel="noopener noreferrer"
                              className="text-white hover:text-gold transition-colors text-sm">
                              {value}
                            </a>
                          ) : (
                            <div className="text-white text-sm">{value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Availability badge */}
                  <div className="flex items-center gap-3 p-4 bg-dark-card border border-dark-border rounded-xl">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <div className="text-white text-sm font-medium">Dostupný pro nové projekty</div>
                      <div className="text-white/40 text-xs">Aktuálně přijímám nové zakázky</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Form */}
              <AnimatedSection delay={0.2}>
                <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: contact page with info and form"
```

---

### Task 8: Portfolio Page (Hidden)

**Files:**
- Modify: `src/pages/Portfolio.tsx`

**Step 1: Replace `src/pages/Portfolio.tsx` with placeholder**

```tsx
import { ExternalLink, Github } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Projekt ${i + 1}`,
  desc: 'Popis projektu bude doplněn.',
  tags: ['React', 'Node.js', 'TypeScript'],
  image: `https://images.unsplash.com/photo-${['1547658719-da2b51169166','1555066931-4365d14bab8c','1551288049-bebda4e38f71','1460925895917-afdab827c52f','1498050108023-c5249f4df085','1507003211169-0a1dd7228f2d'][i]}?w=600&auto=format&fit=crop&q=80`,
}))

export default function Portfolio() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="Portfolio"
              title='Moje <span class="text-gradient">projekty</span>'
              subtitle="Ukázky mé práce — reálné projekty pro reálné klienty."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholders.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.07}>
                  <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-gold/30 transition-all group">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-white mb-1">{project.title}</h3>
                      <p className="text-white/50 text-sm mb-3">{project.desc}</p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {project.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-1.5 text-white/40 hover:text-gold text-sm transition-colors">
                          <Github size={14} /> Kód
                        </button>
                        <button className="flex items-center gap-1.5 text-white/40 hover:text-gold text-sm transition-colors">
                          <ExternalLink size={14} /> Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: portfolio page (hidden from nav) with placeholder cards"
```

---

### Task 9: Polish — Custom Cursor, Smooth Scroll, 404, index.html

**Files:**
- Create: `src/components/CustomCursor.tsx`
- Create: `src/pages/NotFound.tsx`
- Modify: `index.html`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

**Step 1: Create `src/components/CustomCursor.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHover(!!t.closest('a, button, [role="button"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 8, y: pos.y - 8, scale: hover ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.3 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/40 pointer-events-none z-[9998]"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hover ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  )
}
```

**Step 2: Create `src/pages/NotFound.tsx`**

```tsx
import { Link } from 'react-router-dom'
import PageTransition from '@/components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-display text-9xl font-bold text-gradient mb-4">404</div>
          <h2 className="text-2xl font-bold text-white mb-4">Stránka nenalezena</h2>
          <p className="text-white/50 mb-8">Tato stránka neexistuje nebo byla přesunuta.</p>
          <Link to="/" className="px-6 py-3 bg-gold text-dark font-semibold rounded hover:bg-gold-light transition-colors">
            Zpět domů
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
```

**Step 3: Update `index.html` — add title, meta, favicon**

```html
<!doctype html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Tomáš Obzina — Full-Stack Web Developer. Vytvářím moderní webové aplikace a digitální produkty na míru." />
    <meta name="keywords" content="web developer, full-stack, React, Node.js, Česká republika, webové aplikace" />
    <meta property="og:title" content="Tomáš Obzina — Full-Stack Developer" />
    <meta property="og:description" content="Moderní webové aplikace na míru. React, Node.js, TypeScript." />
    <title>Tomáš Obzina — Full-Stack Developer</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 4: Create `/public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#0a0a0a"/>
  <text y="72" x="50" text-anchor="middle" font-family="serif" font-size="55" font-weight="bold" fill="#c9a84c">TO</text>
</svg>
```

**Step 5: Update `src/App.tsx` — add CustomCursor + NotFound route**

Add import and component:
```tsx
import CustomCursor from '@/components/CustomCursor'
import NotFound from '@/pages/NotFound'
// Add <Route path="*" element={<NotFound />} /> to routes
// Add <CustomCursor /> as first child inside Router div
```

**Step 6: Add `cursor: none` to body in `src/index.css`**

```css
body {
  cursor: none;
}
@media (hover: none) {
  body { cursor: auto; }
}
```

**Step 7: Commit**

```bash
git add .
git commit -m "feat: custom cursor, 404 page, meta tags, favicon"
```

---

### Task 10: GitHub Repo + Push

**Step 1: Create GitHub repo**

```bash
gh repo create portfolio --public --description "Tomáš Obzina — Full-Stack Developer Portfolio"
```

**Step 2: Add remote and push**

```bash
cd "D:/Web Moderni"
git remote add origin https://github.com/obzi/portfolio.git
git branch -M main
git push -u origin main
```

**Step 3: Verify push**

```bash
gh repo view obzi/portfolio --web
```

---

### Task 11: Build + Verify

**Step 1: Run production build**

```bash
cd "D:/Web Moderni"
yarn build
```
Expected: `dist/` folder created, no TypeScript errors.

**Step 2: Preview build locally**

```bash
yarn preview
```
Expected: Site serves at http://localhost:4173

**Step 3: Check all pages load without errors in browser**

Visit: `/`, `/about`, `/services`, `/pricing`, `/contact`, `/portfolio`

---

### Task 12: Code Review + Fixes

**Step 1: Run code review**
Invoke `superpowers:requesting-code-review` skill.

**Step 2: Fix any issues found**

**Step 3: Run second code review to confirm fixes**

**Step 4: Final commit with any fixes**

```bash
git add .
git commit -m "fix: code review improvements"
git push
```
