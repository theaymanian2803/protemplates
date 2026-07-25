import { useCategories } from '@/hooks/useTemplates'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Layers,
  ShoppingCart,
  Rocket,
  Palette,
  Code2,
  LayoutDashboard,
  Smartphone,
  Shield,
  FileText,
  HelpCircle,
  Users,
  Mail,
  BookOpen,
  Download,
  Library,
  FileCheck,
  Sparkles,
  Star,
  CreditCard,
  FileBarChart,
  Heart,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const categoryIconMap: Record<string, typeof ShoppingCart> = {
  'E-Commerce': ShoppingCart,
  'SaaS': Rocket,
  'Admin Templates': LayoutDashboard,
  'Portfolio': Palette,
  'Landing Pages': Layers,
  'UI Kits': Palette,
  'Code': Code2,
  'Mobile Apps': Smartphone,
  'WordPress Themes': FileText,
  'eCommerce Templates': ShoppingCart,
  'Site Templates': Layers,
  'Marketing Templates': Rocket,
  'CMS Templates': LayoutDashboard,
  'Blogging': FileText,
}

const getCategoryIcon = (cat: string) => {
  return categoryIconMap[cat] || LayoutDashboard
}

const MegaMenuItem = ({
  icon: Icon,
  title,
  desc,
  to,
  onClick,
}: {
  icon: typeof ShoppingCart
  title: string
  desc: string
  to: string
  onClick?: () => void
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group">
    <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/20 transition-colors">
      <Icon className="w-4 h-4 text-amber-400" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-[#f5f1ea]">{title}</p>
      <p className="text-xs text-[#a89c8c] leading-snug">{desc}</p>
    </div>
  </Link>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const { user, signOut } = useAuth()
  const { totalItems } = useCart()
  const { favorites } = useFavorites()
  const navigate = useNavigate()
  const { data: categories } = useCategories()

  const isAdmin = user?.email === 'theaymanian@yahoo.com' || user?.user_metadata?.role === 'admin'

  const handleSignOut = async () => {
    await signOut()
  }

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/templates?q=${encodeURIComponent(q)}` : '/templates')
    setQuery('')
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1614]/92 backdrop-blur-md border-b border-white/10 text-[#f5f1ea]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(245,158,11,0.6)]">
              <span className="text-[#1a1614] font-extrabold text-lg">U</span>
            </div>
            <span className="font-slab font-bold text-xl text-[#f5f1ea] tracking-tight hidden sm:block">
              Unccodestore
            </span>
          </Link>

          {/* Center Search — desktop only, matches lg nav breakpoint */}
          <form onSubmit={onSearch} className="hidden lg:flex flex-1 max-w-xl">
            <div className="flex w-full items-center rounded-lg border border-white/10 bg-white/[0.04] focus-within:border-amber-400/50 focus-within:bg-white/[0.06] transition-colors overflow-hidden">
              <Search className="w-4 h-4 text-amber-300/60 ml-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, themes, source code…"
                className="flex-1 h-10 px-3 bg-transparent text-sm text-[#f5f1ea] placeholder:text-[#a89c8c]/70 focus:outline-none"
                aria-label="Search"
              />
              <button
                type="submit"
                className="h-10 px-4 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-colors border-l border-white/10"
                aria-label="Submit search">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Desktop Nav with Mega Menus */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {/* Browse Templates Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMegaMenu('browse')}
              onMouseLeave={() => setOpenMegaMenu(null)}>
              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#d8cfc1] hover:text-[#f5f1ea] transition-colors">
                Browse
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMegaMenu === 'browse' ? 'rotate-180' : ''}`} />
              </button>
              {openMegaMenu === 'browse' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-[680px] bg-[#211a15] border border-white/10 rounded-xl shadow-2xl p-5 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest mb-3 px-3">Categories</p>
                      <div className="flex flex-col gap-0.5">
                        {(categories && categories.length > 0 ? categories : ['WordPress Themes', 'eCommerce Templates', 'Site Templates', 'Marketing Templates', 'CMS Templates', 'Blogging', 'E-Commerce', 'SaaS']).slice(0, 8).map((cat) => {
                          const Icon = getCategoryIcon(cat)
                          return (
                            <Link
                              key={cat}
                              to={`/templates?category=${encodeURIComponent(cat)}`}
                              onClick={() => setOpenMegaMenu(null)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
                              <Icon className="w-4 h-4 text-[#a89c8c] group-hover:text-amber-400 transition-colors" />
                              <span className="text-sm text-[#d8cfc1] group-hover:text-[#f5f1ea]">{cat}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest mb-3 px-3">Featured</p>
                      <MegaMenuItem icon={Sparkles} title="Featured themes" desc="Hand-picked by our team" to="/templates?featured=true" onClick={() => setOpenMegaMenu(null)} />
                      <MegaMenuItem icon={Star} title="Best sellers" desc="Top selling templates" to="/templates?sort=bestsellers" onClick={() => setOpenMegaMenu(null)} />
                      <MegaMenuItem icon={Layers} title="Newest items" desc="Just added this week" to="/templates?sort=newest" onClick={() => setOpenMegaMenu(null)} />
                      <MegaMenuItem icon={Palette} title="All templates" desc="Browse the full catalog" to="/templates" onClick={() => setOpenMegaMenu(null)} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest mb-3 px-3">Quick Links</p>
                      <MegaMenuItem icon={Download} title="My downloads" desc="Access purchased items" to="/downloads" onClick={() => setOpenMegaMenu(null)} />
                      <MegaMenuItem icon={Heart} title="My favorites" desc="Saved templates" to="/favorites" onClick={() => setOpenMegaMenu(null)} />
                      <MegaMenuItem icon={ShoppingCart} title="Shopping cart" desc={`${totalItems} item${totalItems !== 1 ? 's' : ''} in cart`} to="/cart" onClick={() => setOpenMegaMenu(null)} />
                      <div className="mt-3 ml-3 mr-3 p-4 rounded-lg bg-amber-500 text-[#1a1614]">
                        <p className="text-sm font-bold font-slab">All-Access Pass</p>
                        <p className="text-xs text-[#1a1614]/80 mt-1">Unlimited downloads for $300</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMegaMenu('company')}
              onMouseLeave={() => setOpenMegaMenu(null)}>
              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#d8cfc1] hover:text-[#f5f1ea] transition-colors">
                Company
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMegaMenu === 'company' ? 'rotate-180' : ''}`} />
              </button>
              {openMegaMenu === 'company' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-[340px] bg-[#211a15] border border-white/10 rounded-xl shadow-2xl p-4">
                    <MegaMenuItem icon={Users} title="About Us" desc="Our story and mission" to="/about" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={Mail} title="Contact Us" desc="Get in touch with us" to="/contact" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={HelpCircle} title="FAQ" desc="Frequently asked questions" to="/faq" onClick={() => setOpenMegaMenu(null)} />
                  </div>
                </div>
              )}
            </div>

            {/* Help & Legal Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMegaMenu('legal')}
              onMouseLeave={() => setOpenMegaMenu(null)}>
              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#d8cfc1] hover:text-[#f5f1ea] transition-colors">
                Help & Legal
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMegaMenu === 'legal' ? 'rotate-180' : ''}`} />
              </button>
              {openMegaMenu === 'legal' && (
                <div className="absolute top-full right-0 pt-2">
                  <div className="w-[380px] bg-[#211a15] border border-white/10 rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-x-3 gap-y-0.5">
                    <MegaMenuItem icon={HelpCircle} title="Help Center" desc="Guides & tutorials" to="/faq" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={Mail} title="Contact Support" desc="Get help from us" to="/contact" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={FileCheck} title="License" desc="Licensing details" to="/license" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={Shield} title="Refunds" desc="Refund policy" to="/refunds" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={Library} title="Privacy Policy" desc="How we handle data" to="/privacy" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={FileBarChart} title="Terms of Service" desc="Terms & conditions" to="/terms" onClick={() => setOpenMegaMenu(null)} />
                    <MegaMenuItem icon={FileText} title="Cookie Policy" desc="Cookie information" to="/cookies" onClick={() => setOpenMegaMenu(null)} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="relative p-2.5 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Favorites">
                  <Heart className="w-[18px] h-[18px] text-[#d8cfc1]" />
                  {favorites.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-[#1a1614] text-[10px] font-bold rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="relative p-2.5 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Cart">
                  <ShoppingCart className="w-[18px] h-[18px] text-[#d8cfc1]" />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-[#1a1614] text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-[#d8cfc1] hover:text-[#f5f1ea]">
                      <User className="w-[18px] h-[18px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#211a15] border border-white/10 text-[#f5f1ea]">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold truncate text-[#f5f1ea]">{user.email}</p>
                      <p className="text-xs text-[#a89c8c]">Signed in</p>
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-[#d8cfc1]">
                      <Link to="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-[#d8cfc1]">
                      <Link to="/downloads">
                        <Download className="w-4 h-4 mr-2" />
                        My downloads
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-[#d8cfc1]">
                      <Link to="/profile">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-[#d8cfc1]">
                        <Link to="/admin">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-white/5 transition-colors" aria-label="Cart">
                  <ShoppingCart className="w-[18px] h-[18px] text-[#d8cfc1]" />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-[#1a1614] text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <div className="w-px h-7 bg-white/15 mx-1" />
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="font-semibold text-[#d8cfc1] hover:text-[#f5f1ea] hover:bg-white/5">
                    Sign In
                  </Button>
                </Link>
              </>
            )}


          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-1 shrink-0">
            <Link to="/cart" className="relative p-2" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-[#d8cfc1]" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-[#1a1614] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-fade-up max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {/* Mobile search inside hamburger */}
              <form onSubmit={onSearch} className="px-3 pt-4 pb-1">
                <div className="flex w-full items-center rounded-lg border border-white/10 bg-white/[0.04] focus-within:border-amber-400/50 transition-colors overflow-hidden">
                  <Search className="w-4 h-4 text-amber-300/60 ml-4 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search templates, themes, source code…"
                    className="flex-1 h-11 px-3 bg-transparent text-sm text-[#f5f1ea] placeholder:text-[#a89c8c]/70 focus:outline-none"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="h-11 px-4 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-colors border-l border-white/10"
                    aria-label="Submit search">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
              {/* Browse section */}
              <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest px-3 mt-3 mb-1">Browse</p>
              <MobileNavLink to="/templates" onClick={() => setIsOpen(false)}>All Templates</MobileNavLink>
              <MobileNavLink to="/templates?featured=true" onClick={() => setIsOpen(false)}>Featured Themes</MobileNavLink>
              <MobileNavLink to="/templates?sort=bestsellers" onClick={() => setIsOpen(false)}>Best Sellers</MobileNavLink>
              <MobileNavLink to="/templates?sort=newest" onClick={() => setIsOpen(false)}>Newest Items</MobileNavLink>

              {/* Categories in mobile */}
              <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest px-3 mt-4 mb-1">Categories</p>
              {(categories && categories.length > 0 ? categories : ['WordPress Themes', 'eCommerce Templates', 'Site Templates', 'Marketing Templates', 'CMS Templates', 'Blogging']).map((cat) => (
                <MobileNavLink key={cat} to={`/templates?category=${encodeURIComponent(cat)}`} onClick={() => setIsOpen(false)}>
                  {cat}
                </MobileNavLink>
              ))}

              {/* Company */}
              <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest px-3 mt-4 mb-1">Company</p>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact Us</MobileNavLink>
              <MobileNavLink to="/faq" onClick={() => setIsOpen(false)}>FAQ</MobileNavLink>


              {/* Help & Legal */}
              <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest px-3 mt-4 mb-1">Help & Legal</p>
              <MobileNavLink to="/license" onClick={() => setIsOpen(false)}>License</MobileNavLink>
              <MobileNavLink to="/refunds" onClick={() => setIsOpen(false)}>Refunds</MobileNavLink>
              <MobileNavLink to="/privacy" onClick={() => setIsOpen(false)}>Privacy Policy</MobileNavLink>
              <MobileNavLink to="/terms" onClick={() => setIsOpen(false)}>Terms of Service</MobileNavLink>
              <MobileNavLink to="/cookies" onClick={() => setIsOpen(false)}>Cookie Policy</MobileNavLink>

              {/* Account */}
              {user && (
                <>
                  <p className="text-[11px] font-bold text-[#a89c8c]/70 uppercase tracking-widest px-3 mt-4 mb-1">Account</p>
                  <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                  <MobileNavLink to="/downloads" onClick={() => setIsOpen(false)}>My Downloads</MobileNavLink>
                  <MobileNavLink to="/favorites" onClick={() => setIsOpen(false)}>Favorites {favorites.length > 0 && `(${favorites.length})`}</MobileNavLink>
                  <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>Settings</MobileNavLink>
                  {isAdmin && <MobileNavLink to="/admin" onClick={() => setIsOpen(false)}>Admin</MobileNavLink>}
                </>
              )}

              <div className="h-px bg-white/10 my-3" />

              <div className="flex flex-col gap-3 px-3">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full border-white/15 bg-transparent text-[#f5f1ea] hover:bg-white/5 hover:text-[#f5f1ea]">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full font-semibold bg-amber-500 text-[#1a1614] hover:bg-amber-400">
                      Sign In
                    </Button>
                  </Link>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const MobileNavLink = ({
  to,
  onClick,
  children,
}: {
  to: string
  onClick: () => void
  children: React.ReactNode
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#d8cfc1] hover:text-[#f5f1ea] hover:bg-white/5 transition-all">
    {children}
    <ChevronRight className="w-4 h-4 text-[#a89c8c]/60" />
  </Link>
)

export default Navbar