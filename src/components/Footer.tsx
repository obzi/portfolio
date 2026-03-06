import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-dark-border bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-gradient">TO</span>
          <span className="text-white/40 text-sm">© {year} Tomáš Obzina</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:t.obzina81@gmail.com"
            className="text-white/40 hover:text-gold transition-colors cursor-pointer">
            <Mail size={18} />
          </a>
        </div>
        <div className="flex gap-6 text-sm text-white/40">
          <Link to="/about" className="hover:text-gold transition-colors">O mně</Link>
          <Link to="/services" className="hover:text-gold transition-colors">Služby</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">Kontakt</Link>
        </div>
      </div>
    </footer>
  )
}
