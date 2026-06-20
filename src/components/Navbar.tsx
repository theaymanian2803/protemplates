import MegaMenu from '@/components/navbar/MegaMenu'
import NavbarSearch from '@/components/navbar/NavbarSearch'
import NotificationBell from '@/components/navbar/NotificationBell'
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
  Settings,
  Shield,
  ShoppingCart,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, signOut } = useAuth()
  const { favorites } = useFavorites()

  // Check if the user is an admin.
  // It checks your specific email to guarantee it works right now,
  // and checks Supabase user_metadata for any future admins you add.
  const isAdmin = user?.email === 'theaymanian@yahoo.com' || user?.user_metadata?.role === 'admin'

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow-primary">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">TemplatePro</span>
          </Link>

          {/* Desktop Nav — centered mega menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <MegaMenu />
          </div>

          {/* Desktop Actions — clean icon row */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            <NavbarSearch />
            <ThemeToggle />

            {user && <NotificationBell />}

            {user && (
              <Link
                to="/favorites"
                className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
                    aria-label="Favoris">
                <Heart className="w-[18px] h-[18px] text-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Panier">
              <ShoppingCart className="w-[18px] h-[18px] text-foreground" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="w-px h-6 bg-border mx-2" />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-[18px] h-[18px]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 bg-background border border-border">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold truncate text-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Connecté</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/dashboard">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/downloads">
                      <Download className="w-4 h-4 mr-2" />
                      Mes téléchargements
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>

                  {/* Admin Dashboard Link */}
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
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 font-semibold">
                  Commencer
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-1">
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-1">
              {/* Primary Links */}
              <MobileNavLink to="/templates" onClick={() => setIsOpen(false)}>
                Parcourir
              </MobileNavLink>

              <MobileAnchorLink href="/#pricing" onClick={() => setIsOpen(false)}>
                Tarifs
              </MobileAnchorLink>
              <MobileAnchorLink href="/#features" onClick={() => setIsOpen(false)}>
                Fonctionnalités
              </MobileAnchorLink>

              <div className="h-px bg-border my-3" />

              {/* Company Links */}
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1">
                Entreprise
              </p>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
                À propos
              </MobileNavLink>
              <MobileNavLink to="/faq" onClick={() => setIsOpen(false)}>
                FAQ
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </MobileNavLink>

              {user && (
                <>
                  <div className="h-px bg-border my-3" />
                  <MobileNavLink to="/favorites" onClick={() => setIsOpen(false)}>
                    Favoris {favorites.length > 0 && `(${favorites.length})`}
                  </MobileNavLink>

                  {/* Admin Dashboard Mobile Link */}
                  {isAdmin && (
                    <MobileNavLink to="/admin" onClick={() => setIsOpen(false)}>
                      Admin
                    </MobileNavLink>
                  )}
                </>
              )}

              <div className="h-px bg-border my-3" />

              {/* Auth Section */}
              <div className="flex gap-3 px-3">
                {user ? (
                  <>
                    <Link to="/dashboard" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Tableau de bord
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-accent hover:text-accent"
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                      Commencer
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

/* --- Sub-components for mobile menu --- */

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

const MobileAnchorLink = ({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/70 transition-all">
    {children}
    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
  </a>
)

export default Navbar
