import { ExternalLink, Github } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'

const placeholders = [
  {
    id: 1,
    title: 'E-commerce Platforma',
    desc: 'Moderní online obchod s React a Node.js backendem. Integrace platební brány, admin panel.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    desc: 'Analytický dashboard pro B2B klienty. Real-time data, grafy, export reportů.',
    tags: ['Next.js', 'TypeScript', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Firemní Web',
    desc: 'Reprezentativní web pro technologickou firmu s animacemi a CMS integrací.',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Rezervační Systém',
    desc: 'Plnohodnotný rezervační systém s kalendářem, notifikacemi a platbami.',
    tags: ['Next.js', 'Prisma', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'REST API Backend',
    desc: 'Škálovatelné API pro mobilní aplikaci. Auth, upload souborů, caching.',
    tags: ['Node.js', 'Express', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Portálová Aplikace',
    desc: 'Interní portál pro správu zaměstnanců a projektů. Role-based access control.',
    tags: ['React', 'TypeScript', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  },
]

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
                        <span className="flex items-center gap-1.5 text-white/20 text-sm">
                          <Github size={14} /> Kód
                        </span>
                        <span className="flex items-center gap-1.5 text-white/20 text-sm">
                          <ExternalLink size={14} /> Demo
                        </span>
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
