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
