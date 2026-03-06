import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import type { Lang } from '@/context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { lang, setLang, t } = useLanguage()

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/pricing', label: t.nav.pricing },
    { path: '/contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  function LangSwitcher({ className = '' }: { className?: string }) {
    return (
      <div className={`flex items-center gap-1 text-sm ${className}`}>
        {(['cs', 'en'] as Lang[]).map((l, i) => (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && <span className="text-white/20">|</span>}
            <button
              onClick={() => setLang(l)}
              className={`font-medium transition-colors cursor-pointer ${
                lang === l ? 'text-gold' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {l.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
    )
  }

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
          <span className="font-display text-xl font-bold text-gradient">RapidLocalSites</span>
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
            {t.nav.cta}
          </Link>
          <LangSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          className="md:hidden text-white/70 hover:text-white cursor-pointer"
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
              <LangSwitcher className="py-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
