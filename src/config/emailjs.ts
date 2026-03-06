const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

if (import.meta.env.DEV && serviceId === 'YOUR_SERVICE_ID') {
  console.warn('[EmailJS] Configure VITE_EMAILJS_* in your .env file. See .env.example')
}

export const EMAILJS_CONFIG = { serviceId, templateId, publicKey }
