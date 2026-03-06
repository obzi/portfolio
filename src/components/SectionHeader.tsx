import { motion } from 'framer-motion'

// title accepts HTML strings with <span> tags for gradient text styling
interface Props {
  label: string
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ label, title, subtitle, className = '' }: Props) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gold text-sm font-medium tracking-widest uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display text-4xl md:text-5xl font-bold text-white mt-2"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg mt-4 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
