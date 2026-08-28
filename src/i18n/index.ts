import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr'
import ar from './locales/ar'
import frTemplates from './locales/fr.templates'
import arTemplates from './locales/ar.templates'
import frPreview from './locales/fr.preview'
import arPreview from './locales/ar.preview'
import frCheckout from './locales/fr.checkout'
import arCheckout from './locales/ar.checkout'

export type Lang = 'fr' | 'ar'

export const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'fr'
  const urlLang = new URLSearchParams(window.location.search).get('lang')
  if (urlLang === 'ar' || urlLang === 'fr') return urlLang
  return localStorage.getItem('lang') === 'ar' ? 'ar' : 'fr'
}

export const applyLang = (lang: Lang) => {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export const setLanguage = (lang: Lang) => {
  localStorage.setItem('lang', lang)
  applyLang(lang)
  i18n.changeLanguage(lang)
}

const initialLang = getInitialLang()

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: { ...fr, ...frTemplates, ...frPreview, ...frCheckout } },
    ar: { translation: { ...ar, ...arTemplates, ...arPreview, ...arCheckout } },
  },
  lng: initialLang,
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

if (typeof window !== 'undefined') {
  applyLang(initialLang)
}

export default i18n