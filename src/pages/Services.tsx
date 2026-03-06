import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code2, Server, Smartphone, BarChart2, Shield } from 'lucide-react'
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
