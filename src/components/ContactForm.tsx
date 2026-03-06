import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { EMAILJS_CONFIG } from '@/config/emailjs'

interface Props {
  selectedPackage?: string
}

export default function ContactForm({ selectedPackage = '' }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    package: selectedPackage,
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (selectedPackage) {
      setForm((prev) => ({ ...prev, package: selectedPackage }))
    }
  }, [selectedPackage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          package: form.package,
          message: form.message,
          to_email: 't.obzina81@gmail.com',
        },
        EMAILJS_CONFIG.publicKey
      )
      setStatus('success')
      setForm({ name: '', email: '', package: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-white/50 text-sm mb-2">Vaše jméno *</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jan Novák"
            className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-white/50 text-sm mb-2">E-mail *</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jan@firma.cz"
            className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-package" className="block text-white/50 text-sm mb-2">Zájem o balíček</label>
        <select
          id="contact-package"
          name="package"
          value={form.package}
          onChange={handleChange}
          className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
        >
          <option value="">Vyberte balíček (nepovinné)</option>
          <option value="Starter">Starter — 15 000–30 000 Kč</option>
          <option value="Pro">Pro — 30 000–70 000 Kč</option>
          <option value="Enterprise">Enterprise — od 70 000 Kč</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-white/50 text-sm mb-2">Popis projektu *</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Popište váš projekt, cíle a požadavky..."
          className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-4">
          <CheckCircle size={20} />
          <span>Zpráva odeslána! Ozveme se do 24 hodin.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
          <AlertCircle size={20} />
          <span>Chyba odeslání. Zkuste znovu nebo napište přímo na t.obzina81@gmail.com</span>
        </div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gold text-dark font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 disabled:opacity-50 cursor-pointer"
      >
        <Send size={18} />
        {status === 'sending' ? 'Odesílám...' : 'Odeslat poptávku'}
      </motion.button>
    </form>
  )
}
