import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-dark-border bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-gradient text-sm">RapidLocalSites</span>
          <span className="text-white/40 text-sm">{t.footer.copyright.replace('{year}', String(year))}</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:t.obzina81@gmail.com"
            className="text-white/40 hover:text-gold transition-colors cursor-pointer"
          >
            <Mail size={18} />
          </a>
        </div>
        <div className="flex gap-6 text-sm text-white/40">
          <Link to="/about" className="hover:text-gold transition-colors">{t.footer.about}</Link>
          <Link to="/services" className="hover:text-gold transition-colors">{t.footer.services}</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">{t.footer.contact}</Link>
        </div>
      </div>
    </footer>
  )
}
