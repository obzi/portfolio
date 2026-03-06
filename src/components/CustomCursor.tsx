import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches)
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHover(!!t.closest('a, button, [role="button"], input, textarea, select'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hover ? 2 : 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 35, mass: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/50 pointer-events-none z-[9998]"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hover ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
      />
    </>
  )
}
