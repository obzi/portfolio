import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'
import SEO from '@/components/SEO'
import { useLanguage } from '@/context/LanguageContext'

export default function Pricing() {
  const [selectedPackage, setSelectedPackage] = useState('')
  const { t } = useLanguage()

  // Mark the middle card (index 1) as popular
  const cards = t.pricing.cards.map((pkg, i) => ({ ...pkg, popular: i === 1 }))

  return (
    <PageTransition>
      <SEO titleKey="pricingTitle" descKey="pricingDesc" />
      <div className="pt-20 min-h-screen">
        {/* Packages */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label={t.pricing.sectionLabel}
              title={t.pricing.title}
              subtitle={t.pricing.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-6">
              {cards.map((pkg, i) => (
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
                          <Star size={10} fill="currentColor" /> {t.pricing.popular}
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
                      className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
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
              <p className="text-white/40 text-sm">{t.pricing.footerNote}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact-form" className="py-20 px-6 bg-dark-surface">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              label={t.pricing.formLabel}
              title={t.pricing.formTitle}
              subtitle={t.pricing.formSubtitle}
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
