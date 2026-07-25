import { Twitter, Instagram, Linkedin, Github, Youtube, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Browse: [
    { label: 'All Templates', to: '/templates' },
    { label: 'Featured Themes', to: '/templates?featured=true' },
    { label: 'Best Sellers', to: '/templates?sort=bestsellers' },
    { label: 'Newest Items', to: '/templates?sort=newest' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
  ],
  'Help & Legal': [
    { label: 'Help Center', to: '/faq' },
    { label: 'License', to: '/license' },
    { label: 'Refunds', to: '/refunds' },
    { label: 'Privacy Policy', to: '/privacy' },
  ],
  Account: [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'My Downloads', to: '/downloads' },
    { label: 'Favorites', to: '/favorites' },
    { label: 'Shopping Cart', to: '/cart' },
  ],
}

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#13100d] text-[#f5f1ea] pt-16">
      {/* subtle amber glow from the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 30% at 50% 0%, rgba(249,115,22,0.10) 0%, rgba(19,16,13,0) 50%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,1) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-[0_0_24px_-4px_rgba(245,158,11,0.6)]">
                <span className="text-[#13100d] font-extrabold text-lg">U</span>
              </div>
              <span className="font-slab font-bold text-xl text-[#f5f1ea] tracking-tight">Unccodestore</span>
            </Link>
            <p className="text-[#a89c8c] mb-6 max-w-xs leading-relaxed text-sm">
              The marketplace for premium website templates and source code. Build faster, launch
              sooner — coming 2027.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Github, label: 'GitHub' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#a89c8c] hover:bg-amber-400/15 hover:border-amber-400/40 hover:text-amber-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#a89c8c]/70 mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#a89c8c] hover:text-amber-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="font-slab font-bold text-lg text-[#f5f1ea] mb-1">Get new drops in your inbox</h3>
              <p className="text-sm text-[#a89c8c]">
                Weekly: fresh templates, code, and creator spotlights. No spam.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a89c8c]/60" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-11 pl-11 pr-4 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-[#f5f1ea] placeholder:text-[#a89c8c]/50 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/15 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 rounded-lg bg-amber-500 text-[#13100d] font-semibold text-sm hover:bg-amber-400 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#a89c8c]/60 text-sm">
          <p>&copy; 2027 Unccodestore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#f5f1ea] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">Privacy</Link>
            <Link to="/terms" className="hover:text-[#f5f1ea] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">Terms</Link>
            <Link to="/cookies" className="hover:text-[#f5f1ea] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">Cookies</Link>
            <Link to="/license" className="hover:text-[#f5f1ea] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">License</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer