# Tomáš Obzina — Portfolio Web Design Doc
Date: 2026-03-06

## Overview
Personal portfolio website for Tomáš Obzina, Full-Stack Web Developer.

## Stack
- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Router v6
- EmailJS (contact form, no backend)
- Yarn build

## Visual Identity
- **Style:** Dark premium / luxury
- **Background:** #0a0a0a (near-black)
- **Accent:** #c9a84c (gold)
- **Surface:** #111111 / #1a1a1a
- **Text:** #ffffff / #a0a0a0

## Pages
1. **Home** — Hero with animated typing text, gradient/particle BG, CTA
2. **O mně (About)** — Bio, tech stack icons, experience timeline
3. **Služby (Services)** — 4 service cards with hover effects
4. **Ceník (Pricing)** — 3 packages (Starter/Pro/Enterprise) + EmailJS contact form
5. **Kontakt (Contact)** — Contact info, social links, secondary contact form
6. **Portfolio** — Hidden from nav, placeholder project cards (future use)

## Animations
- Scroll-triggered fade-in (Framer Motion)
- Typing effect in hero (react-type-animation)
- Smooth page transitions
- Hover effects on cards (scale, glow)
- Magnetic cursor effect

## Contact Form
- EmailJS integration
- Sends to: t.obzina81@gmail.com
- Fields: Name, Email, Message, Package selection (on pricing page)

## Images
- Unsplash free license images via direct URL
- Tech stack SVG icons from devicons/simple-icons

## GitHub
- Account: obzi
- New repo: portfolio (public)
- Deploy: GitHub Pages or Netlify
