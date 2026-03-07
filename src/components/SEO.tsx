import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/context/LanguageContext'

type TitleKey = 'homeTitle' | 'aboutTitle' | 'servicesTitle' | 'pricingTitle' | 'contactTitle'
type DescKey = 'homeDesc' | 'aboutDesc' | 'servicesDesc' | 'pricingDesc' | 'contactDesc'

interface SEOProps {
  titleKey: TitleKey
  descKey: DescKey
}

export default function SEO({ titleKey, descKey }: SEOProps) {
  const { t, lang } = useLanguage()
  const title = t.seo[titleKey]
  const description = t.seo[descKey]
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const canonical = `https://rapidlocalsites.eu${path}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="RapidLocalSites" />
      <meta property="og:locale" content={lang === 'cs' ? 'cs_CZ' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'RapidLocalSites',
          url: 'https://rapidlocalsites.eu',
          email: 't.obzina81@gmail.com',
          areaServed: ['CZ', 'SK', 'EU'],
          description: description,
          serviceType: 'Web Development',
          priceRange: lang === 'cs' ? '15 000–70 000+ Kč' : '€600–€2 800+',
        })}
      </script>
    </Helmet>
  )
}
