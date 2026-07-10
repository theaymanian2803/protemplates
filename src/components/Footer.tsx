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
    { label: 'Become an Author', to: '/auth' },
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
    <footer className="bg-neutral-950 text-neutral-100 pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-glow-primary">
                <span className="text-primary-foreground font-extrabold text-lg">U</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight">Unccodestore</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-xs leading-relaxed">
              The marketplace for premium website templates and source code. Build faster, sell
              smarter — launching 2027.
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
                  className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-200 mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-400 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-800 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="font-bold text-lg mb-1">Get new drops in your inbox</h3>
              <p className="text-sm text-neutral-400">
                Weekly: fresh templates, code, and creator spotlights. No spam.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-11 pl-11 pr-4 rounded-lg bg-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary border border-neutral-800"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-sm">
          <p>© 2027 Unccodestore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-neutral-100 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-neutral-100 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-neutral-100 transition-colors">Cookies</Link>
            <Link to="/license" className="hover:text-neutral-100 transition-colors">License</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer