import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCategories } from "@/hooks/useTemplates";
import {
  Grid3X3,
  Loader2,
  Sparkles,
  LayoutTemplate,
  HelpCircle,
  Mail,
  Users,
  BookOpen,
  Star,
  ArrowRight,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MegaMenu = () => {
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {/* Templates Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50 data-[state=open]:bg-muted/50 h-auto py-2 px-3">
            <span className="text-sm font-semibold text-foreground">Templates</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[560px] p-6">
              <div className="grid grid-cols-5 gap-6">
                {/* Featured CTA */}
                <div className="col-span-2 rounded-xl bg-primary/5 border border-primary/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-1">
                      Explore All
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Browse our full collection of premium templates built for modern web.
                    </p>
                  </div>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => navigate("/templates")}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Browse All <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </NavigationMenuLink>
                </div>

                {/* Categories Grid */}
                <div className="col-span-3">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Categories
                  </p>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : categories && categories.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1">
                      {categories.map((category) => (
                        <NavigationMenuLink key={category} asChild>
                          <button
                            onClick={() =>
                              navigate(`/templates?category=${encodeURIComponent(category)}`)
                            }
                            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all capitalize text-left w-full group"
                          >
                            <LayoutTemplate className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                            {category}
                          </button>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-2">No categories yet</p>
                  )}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Company Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50 data-[state=open]:bg-muted/50 h-auto py-2 px-3">
            <span className="text-sm font-semibold text-foreground">Company</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[320px] p-4">
              <div className="space-y-1">
                <NavigationMenuLink asChild>
                  <Link
                    to="/about"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted/70 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">About Us</p>
                      <p className="text-xs text-muted-foreground">Our story and mission</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted/70 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Contact</p>
                      <p className="text-xs text-muted-foreground">Get in touch with us</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    to="/faq"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted/70 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">FAQ</p>
                      <p className="text-xs text-muted-foreground">Common questions answered</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Homepage anchor links */}
        {isHomePage && (
          <>
            <NavigationMenuItem>
              <a
                href="#pricing"
                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
              >
                Pricing
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href="#features"
                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
              >
                Features
              </a>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
