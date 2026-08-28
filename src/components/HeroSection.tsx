import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTemplates } from '@/hooks/useTemplates'
import { topTemplates } from '@/data/topTemplates'

/*
  HERO — bolt-spec centered stage: warm off-white ground, cold-orange radial
  atmosphere, floating tech chips, badge + serif headline + search instrument,
  a fanned deck of REAL product cards (screenshot + white frame + meta bar)
  beneath the copy, and the trust line at the fold. Search and tags navigate
  to /templates?q=..., each card links to /template/:id.
*/

const popularTags = [
  'WordPress',
  'React',
  'Admin Dashboard',
  'Landing Page',
  'eCommerce',
  'Portfolio',
]

const chips = [
  { label: 'React', className: 'chip--react' },
  { label: 'TypeScript', className: 'chip--typescript' },
  { label: 'Tailwind', className: 'chip--tailwind' },
  { label: 'Next.js', className: 'chip--next' },
  { label: 'Supabase', className: 'chip--supabase' },
]

type DeckCard = {
  id: string
  title: string
  image_url: string
  artist: string
}

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({})
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: templates } = useTemplates({ limit: 5 })

  const cards: DeckCard[] = [...(templates ?? []), ...topTemplates]
    .map((c) => ({ id: c.id, title: c.title, image_url: c.image_url, artist: c.category }))
    .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
    .slice(0, 5)

  const goToTemplates = (value: string) => {
    const params = new URLSearchParams()
    if (value.trim()) params.set('q', value.trim())
    navigate(`/templates${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    goToTemplates(query)
  }

  return (
    <section className="template-hero">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-accents" aria-hidden="true">
        <span className="accent-orb accent-orb--left" />
        <span className="accent-orb accent-orb--right" />
        <span className="accent-orb accent-orb--center" />
        <span className="accent-ring accent-ring--one" />
        <span className="accent-ring accent-ring--two" />
        <span className="accent-dash accent-dash--one" />
        <span className="accent-dash accent-dash--two" />
      </div>
      <div className="floating-chips" aria-hidden="true">
        {chips.map((chip) => (
          <span className={`floating-chip ${chip.className}`} key={chip.label}>{chip.label}</span>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge"><Sparkles size={13} /> {t('hero.badge')}</div>
        <h1>
          <span>{t('hero.title1')}</span>
          <br />
          {t('hero.title2')}
        </h1>
        <p>{t('hero.subtitle')}</p>
        <div className="hero-actions">
          <a className="hero-button hero-button--primary" href="#featured">
            {t('hero.discoverMore')} <ArrowRight size={15} className="rtl:rotate-180" />
          </a>
          <Link className="hero-button hero-button--secondary" to="/templates">
            {t('hero.allCollections')} <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </div>

        <form className="hero-search" onSubmit={onSearch} role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('common.searchPlaceholder')}
            aria-label={t('common.search')}
          />
          <button type="submit"><span>{t('common.search')}</span><ArrowRight size={15} className="rtl:rotate-180" /></button>
        </form>
        <div className="popular-tags">
          <span>{t('hero.popular')}</span>
          {popularTags.map((tag) => (
            <button type="button" key={tag} onClick={() => { setQuery(tag); goToTemplates(tag) }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="card-stage" id="featured" role="group" aria-label={t('card.deckAria')}>
        <div className="card-deck">
          {cards.map((card, index) => (
            <Link
              to={`/template/${card.id}`}
              aria-label={t('card.view', { title: card.title })}
              className={`template-card ${failedImgs[card.id] ? 'template-card--fallback' : ''}`}
              key={card.id}
            >
              <div className="template-visual">
                <span className="visual-label">{String(index + 1).padStart(2, '0')}</span>
                <span className="visual-window"><i /><i /><i /></span>
                {failedImgs[card.id] ? (
                  <>
                    <span className="visual-fallback" />
                    <span className="visual-title">{card.title}</span>
                  </>
                ) : (
                  <img
                    src={card.image_url}
                    alt=""
                    loading={index === 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    onError={() => setFailedImgs((prev) => (prev[card.id] ? prev : { ...prev, [card.id]: true }))}
                  />
                )}
              </div>
              <div className="template-meta">
                <strong>{card.title}</strong>
                <span>{card.artist}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="hero-trust">
        <span><b /> {t('hero.trust1')}</span>
        <span><b /> {t('hero.trust2')}</span>
        <span><b /> {t('hero.trust3')}</span>
        <Link to="/templates">
          {t('hero.browseCatalog')} <ArrowRight size={15} className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  )
}

export default HeroSection