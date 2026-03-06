import { Mail, MapPin, Clock } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

const info = [
  { icon: Mail, label: 'E-mail', value: 't.obzina81@gmail.com', href: 'mailto:t.obzina81@gmail.com' },
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
                              className="text-white hover:text-gold transition-colors text-sm cursor-pointer">
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
