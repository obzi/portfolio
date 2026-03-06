import { Link } from 'react-router-dom'
import PageTransition from '@/components/PageTransition'
export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-display text-9xl font-bold text-gradient mb-4">404</div>
          <h2 className="text-2xl font-bold text-white mb-4">Stránka nenalezena</h2>
          <p className="text-white/50 mb-8">Tato stránka neexistuje nebo byla přesunuta.</p>
          <Link to="/" className="px-6 py-3 bg-gold text-dark font-semibold rounded hover:bg-gold-light transition-colors cursor-pointer">
            Zpět domů
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
