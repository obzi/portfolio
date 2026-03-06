import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code2, Server, Smartphone, Shield } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'
import { useLanguage } from '@/context/LanguageContext'

const SERVICE_ICONS = [Code2, Server, Smartphone, Shield]

export default function Services() {
  const { t } = useLanguage()

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              label={t.services.sectionLabel}
              title={t.services.title}
              subtitle={t.services.subtitle}
            />

            <div className="grid md:grid-cols-2 gap-6">
              {t.services.cards.map((service, i) => {
                const Icon = SERVICE_ICONS[i]
                return (
                  <AnimatedSection key={service.title} delay={i * 0.07} className="h-full">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="bg-dark-card border border-dark-border rounded-2xl p-6 h-full flex flex-col hover:border-gold/30 transition-colors group cursor-default"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                        <Icon size={22} className="text-gold" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed mb-4">{service.desc}</p>
                      <ul className="space-y-1.5 mt-auto">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-white/40 text-sm">
                            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatedSection>
                )
              })}
            </div>

            <AnimatedSection className="text-center mt-16">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-semibold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
              >
                {t.services.consultCta}
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
