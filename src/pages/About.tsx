import { motion } from 'framer-motion'
import { Code2, Database, Globe, Server, Layers, Cpu } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'

const techCategories = [
  {
    label: 'Frontend',
    icon: Code2,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    label: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'REST API', 'GraphQL', 'JWT auth', 'WebSockets'],
  },
  {
    label: 'Databáze',
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase', 'SQL migrace'],
  },
  {
    label: 'Infrastruktura',
    icon: Cpu,
    items: ['Docker', 'AWS', 'CI/CD', 'Vercel', 'Nginx', 'GitHub Actions'],
  },
  {
    label: 'Integrace',
    icon: Globe,
    items: ['Stripe', 'SendGrid', 'Webhooks', 'OAuth 2.0', 'REST klienti', 'Firebase'],
  },
  {
    label: 'Přístupy',
    icon: Layers,
    items: ['Clean Architecture', 'TDD', 'Agile', 'Code review', 'DRY & SOLID', 'Git workflow'],
  },
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

export default function About() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        {/* Header + Bio */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              label="O mně"
              title='Vítejte, jsem <span class="text-gradient">Tomáš Obzina</span>'
              subtitle="Full-Stack Developer s vášní pro čistý kód a skvělý uživatelský zážitek"
            />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Visual */}
              <AnimatedSection>
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden border-gradient">
                    <img
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
                      alt="Moderní vývoj webových aplikací"
                      className="w-full h-full object-cover"
                    />
                  </div>
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

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    {[
                      { value: '50+', label: 'Projektů' },
                      { value: '30+', label: 'Klientů' },
                      { value: '8+', label: 'Let praxe' },
                    ].map((s) => (
                      <div key={s.label} className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
                        <div className="text-gradient font-display font-bold text-2xl">{s.value}</div>
                        <div className="text-white/40 text-xs mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Tech stack by category */}
        <section className="py-20 px-6 bg-dark-surface">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              label="Technologie"
              title='Co používám <span class="text-gradient">každý den</span>'
              subtitle="Moderní stack pečlivě vybraný pro výkon, udržitelnost a developer experience"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {techCategories.map((cat, i) => (
                <AnimatedSection key={cat.label} delay={i * 0.07} className="h-full">
                  <div className="bg-dark-card border border-dark-border rounded-2xl p-5 h-full hover:border-gold/30 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <cat.icon size={17} className="text-gold" />
                      </div>
                      <span className="text-white font-semibold text-sm">{cat.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <motion.span
                          key={item}
                          whileHover={{ scale: 1.05 }}
                          className="px-2.5 py-1 bg-dark border border-dark-border text-white/55 text-xs rounded-full hover:border-gold/40 hover:text-gold transition-colors"
                        >
                          {item}
                        </motion.span>
                      ))}
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
                  <AnimatedSection key={item.year} delay={i * 0.1}>
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
