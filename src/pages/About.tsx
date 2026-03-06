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
