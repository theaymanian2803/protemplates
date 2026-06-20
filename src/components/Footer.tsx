import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, { label: string; to: string }[]> = {
    Produit: [
      { label: "Templates", to: "/templates" },
      { label: "Tarifs", to: "/#pricing" },
      { label: "Fonctionnalités", to: "/#features" },
      { label: "Pass illimité", to: "/#pricing" },
    ],
    Entreprise: [
      { label: "À propos", to: "/about" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
    Légal: [
      { label: "Confidentialité", to: "/privacy" },
      { label: "Conditions d'utilisation", to: "/terms" },
      { label: "Cookies", to: "/cookies" },
      { label: "Licence", to: "/license" },
      { label: "Remboursement", to: "/refunds" },
    ],
  };

  return (
    <footer className="bg-neutral-900 text-neutral-100 py-16 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-display font-bold text-xl">TemplatePro</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-xs">
              Des templates premium pour créateurs modernes. Créez plus vite, lancez plus tôt.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.to}
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-800 pt-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">Abonnez-vous à notre newsletter</h3>
              <p className="text-neutral-400">Recevez les derniers templates et actualités directement dans votre boîte mail.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Entrez votre email"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="h-12 px-6 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-sm">
          <p>© {currentYear} TemplatePro. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-neutral-100 transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-neutral-100 transition-colors">Conditions</Link>
            <Link to="/cookies" className="hover:text-neutral-100 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
