import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { setLanguage, type Lang } from '@/i18n'

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { i18n } = useTranslation()
  const current = i18n.language === 'ar' ? 'ar' : 'fr'

  const switchTo = (lang: Lang) => {
    if (lang !== current) setLanguage(lang)
  }

  return (
    <div
      className="flex items-center rounded-lg border border-[#EAEAEA] bg-white overflow-hidden"
      role="group"
      aria-label="Langue / اللغة">
      <span className={`flex items-center px-1.5 ${compact ? '' : 'pl-2.5'} text-[#787774]`}>
        <Globe className="w-3.5 h-3.5" />
      </span>
      <button
        type="button"
        onClick={() => switchTo('fr')}
        aria-pressed={current === 'fr'}
        className={`px-2 py-1.5 text-xs font-semibold transition-colors ${
          current === 'fr'
            ? 'bg-[#e85a2d] text-white'
            : 'text-[#2F3437] hover:text-[#111111] hover:bg-[#F5F4F0]'
        }`}>
        FR
      </button>
      <span className="w-px h-3.5 bg-[#EAEAEA]" />
      <button
        type="button"
        onClick={() => switchTo('ar')}
        aria-pressed={current === 'ar'}
        className={`px-2 py-1.5 text-xs font-semibold transition-colors ${
          current === 'ar'
            ? 'bg-[#e85a2d] text-white'
            : 'text-[#2F3437] hover:text-[#111111] hover:bg-[#F5F4F0]'
        }`}>
        العربية
      </button>
    </div>
  )
}

export default LanguageSwitcher