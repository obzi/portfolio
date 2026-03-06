export interface NavTranslations {
  home: string
  about: string
  services: string
  pricing: string
  contact: string
  cta: string
}

export interface PricingCard {
  name: string
  price: string
  desc: string
  features: string[]
  cta: string
}

export interface ServiceCard {
  title: string
  desc: string
  features: string[]
}

export interface TimelineItem {
  year: string
  role: string
  company: string
  desc: string
}

export interface TechCategory {
  label: string
}

export interface SEOTranslations {
  homeTitle: string
  homeDesc: string
  aboutTitle: string
  aboutDesc: string
  servicesTitle: string
  servicesDesc: string
  pricingTitle: string
  pricingDesc: string
  contactTitle: string
  contactDesc: string
}

export interface Translations {
  nav: NavTranslations
  home: {
    badge: string
    title: string
    typing: string[]
    tagline: string
    cta1: string
    cta2: string
    highlight1: string
    highlight2: string
    highlight3: string
    stat1label: string
    stat2label: string
    stat3label: string
    introTitle: string
    introText: string
    introLink: string
  }
  about: {
    sectionLabel: string
    title: string
    subtitle: string
    bio1: string
    bio2: string
    stat1label: string
    stat2label: string
    stat3label: string
    techLabel: string
    techSubtitle: string
    techCategories: TechCategory[]
    timelineLabel: string
    timelineTitle: string
    timeline: TimelineItem[]
    imageAlt: string
    yearsLabel: string
    yearsValue: string
    partnerTitle: string
  }
  services: {
    sectionLabel: string
    title: string
    subtitle: string
    consultCta: string
    cards: ServiceCard[]
  }
  pricing: {
    sectionLabel: string
    title: string
    subtitle: string
    popular: string
    footerNote: string
    formLabel: string
    formTitle: string
    formSubtitle: string
    cards: PricingCard[]
    selectPlaceholder: string
  }
  contact: {
    sectionLabel: string
    title: string
    subtitle: string
    writeTitle: string
    writeText: string
    emailLabel: string
    locationLabel: string
    availLabel: string
    locationValue: string
    availValue: string
    availBadge: string
    availBadgeSub: string
  }
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    packageLabel: string
    packagePlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitLabel: string
    sendingLabel: string
    successMsg: string
    errorMsg: string
  }
  footer: {
    copyright: string
    about: string
    services: string
    contact: string
  }
  seo: SEOTranslations
}
