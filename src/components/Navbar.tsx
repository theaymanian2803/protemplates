import ThemeToggle from '@/components/ThemeToggle'
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
  ChevronRight,
  Download,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Web Themes & Templates', to: '/templates' },
  { label: 'Code', to: '/templates?category=Code' },
  { label: 'UI Kits', to: '/templates?category=UI%20Kits' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { user, signOut } = useAuth()
  const { totalItems } = useCart()
  const { favorites } = useFavorites()
  const navigate = useNavigate()

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-glow-primary">
              <span className="text-primary-foreground font-extrabold text-lg">U</span>
            </div>
            <span className="font-extrabold text-xl text-foreground tracking-tight">
              Unccodestore
            </span>
          </Link>

          {/* Center Search — prominent */}
          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full items-center rounded-lg border border-border bg-muted/40 focus-within:border-primary focus-within:bg-background transition-colors overflow-hidden">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, source code, UI kits…"
                className="flex-1 h-10 px-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search"
              />
              <button
                type="submit"
                className="h-10 px-4 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border-l border-border/60"
                aria-label="Submit search">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Desktop Nav links */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Favorites">
                  <Heart className="w-[18px] h-[18px] text-foreground" />
                  {favorites.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Cart">
                  <ShoppingCart className="w-[18px] h-[18px] text-foreground" />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-[18px] h-[18px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold truncate text-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Signed in</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/downloads">
                        <Download className="w-4 h-4 mr-2" />
                        My downloads
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/profile">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/admin">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-accent">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-muted transition-colors" aria-label="Cart">
                <ShoppingCart className="w-[18px] h-[18px] text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            <div className="w-px h-7 bg-border mx-1" />

            {!user && (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="font-semibold">
                  Sign In
                </Button>
              </Link>
            )}

            <Link to="/auth">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 font-semibold group">
                <Sparkles className="w-4 h-4 mr-1 group-hover:rotate-12 transition-transform" />
                Start Selling
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-1 shrink-0">
            <ThemeToggle />
            <Link to="/cart" className="relative p-2" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <form onSubmit={onSearch} className="md:hidden pb-3">
          <div className="flex w-full items-center rounded-lg border border-border bg-muted/40 focus-within:border-primary focus-within:bg-background transition-colors overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates, source code, UI kits…"
              className="flex-1 h-11 px-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search"
            />
            <button
              type="submit"
              className="h-11 px-4 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border-l border-border/60"
              aria-label="Submit search">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-fade-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <MobileNavLink key={link.label} to={link.to} onClick={() => setIsOpen(false)}>
                  {link.label}
                </MobileNavLink>
              ))}

              {user && (
                <MobileNavLink to="/favorites" onClick={() => setIsOpen(false)}>
                  Favorites {favorites.length > 0 && `(${favorites.length})`}
                </MobileNavLink>
              )}
              {isAdmin && (
                <MobileNavLink to="/admin" onClick={() => setIsOpen(false)}>
                  Admin
                </MobileNavLink>
              )}

              <div className="h-px bg-border my-3" />

              <div className="flex flex-col gap-3 px-3">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-accent hover:text-accent"
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
                    <Button variant="outline" size="sm" className="w-full font-semibold">
                      Sign In
                    </Button>
                  </Link>
                )}
                <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Start Selling
                  </Button>
                </Link>
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
    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/70 transition-all">
    {children}
    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
  </Link>
)

export default Navbar