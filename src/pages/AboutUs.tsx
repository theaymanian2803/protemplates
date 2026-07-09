import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Heart,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  Shield,
  Rocket,
  Code,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const statIcons = [Rocket, Users, Palette, Globe];
const valueIcons = [Target, Users, Zap, Heart, Shield, Code];
const valueColors = [
  "bg-primary/10 text-primary",
  "bg-blue-500/10 text-blue-500",
  "bg-amber-500/10 text-amber-500",
  "bg-rose-500/10 text-rose-500",
  "bg-emerald-500/10 text-emerald-500",
  "bg-violet-500/10 text-violet-500",
];

const aboutData = {
  hero_badge: 'À propos de TemplatePro',
  hero_headline: 'Nous construisons l\'avenir du',
  hero_highlight: 'Design Web',
  hero_subheadline: "Notre mission est de rendre le design web professionnel accessible à tous — des fondateurs solo aux équipes enterprise.",
  hero_cta_primary_text: 'Voir les templates',
  hero_cta_primary_link: '/templates',
  hero_cta_secondary_text: 'Nous contacter',
  hero_cta_secondary_link: '/contact',
  stats: [
    { value: '50K+', label: 'Templates vendus' },
    { value: '12K+', label: 'Clients satisfaits' },
    { value: '500+', label: 'Auteurs premium' },
    { value: '150+', label: 'Pays desservis' },
  ],
  mission_badge: 'Notre mission',
  mission_headline: 'Permettre aux créateurs de lancer plus vite et de mieux construire',
  mission_paragraphs: [
    'TemplatePro est né en 2018 d\'une simple frustration : pourquoi le design web de qualité devrait-il être réservé à ceux qui ont de gros budgets ou des compétences spécialisées ?',
    'Nous hébergeons plus de 500 auteurs talentueux dans le monde entier, offrant des templates dans les domaines de l\'e-commerce, des portfolios, des landing pages, des tableaux de bord et bien plus — chacun vérifié pour la qualité du design, le code propre et l\'expérience utilisateur exceptionnelle.',
  ],
  mission_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop',
  awards: [
    { title: 'Meilleure place de marché', subtitle: 'Web Awards 2023' },
    { title: '98% de satisfaction', subtitle: 'Avis clients' },
  ],
  values_badge: 'Nos valeurs',
  values_headline: 'Nos valeurs fondamentales',
  values_subheadline: 'Ces principes guident tout ce que nous faisons — de la sélection des templates au soutien de notre communauté mondiale de créateurs.',
  values: [
    { title: 'Qualité avant tout', description: 'Chaque template est soumis à une révision rigoureuse — design pixel-parfait, code propre et réactivité irréprochable.' },
    { title: 'Axé sur la communauté', description: 'Nous permettons aux designers et développeurs du monde entier de montrer leur créativité et de bâtir des carrières prospères.' },
    { title: 'Innovation', description: 'Rester en avance sur les tendances du design avec des templates de pointe qui aident les entreprises à se démarquer en ligne.' },
    { title: 'Réussite client', description: 'Votre réussite est notre priorité. Support dédié et ressources pour vous aider à lancer plus vite.' },
    { title: 'Confiance et sécurité', description: 'Transactions sécurisées, code sous licence et garantie de remboursement sur chaque achat.' },
    { title: 'Conviviale pour les développeurs', description: 'Code propre et bien documenté, construit avec des frameworks modernes. Facile à personnaliser et à étendre.' },
  ],
  team_badge: 'L\'équipe',
  team_headline: 'Rencontrez notre équipe',
  team_subheadline: 'Les passionnés derrière TemplatePro qui travaillent sans relâche pour vous offrir les meilleurs templates.',
  team: [
    { name: 'Sarah Chen', role: 'Fondatrice & PDG', bio: 'Ancienne responsable design chez Figma. Passionnée par la démocratisation du design web pour tous.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
    { name: 'Marcus Johnson', role: 'Directeur du Design', bio: 'Designer primé avec plus de 10 ans d\'expérience dans la création d\'expériences numériques magnifiques.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
    { name: 'Emily Rodriguez', role: 'Développeuse principale', bio: 'Développeuse full-stack obsédée par la performance, l\'accessibilité et l\'architecture propre.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
    { name: 'David Kim', role: 'Responsable Réussite Client', bio: 'Veille à ce que chaque client vive une expérience exceptionnelle, de l\'achat au lancement.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
  ],
  milestones_badge: 'Notre parcours',
  milestones_headline: 'Étapes clés',
  milestones: [
    { year: '2018', title: 'Le début', event: 'TemplatePro fondé avec la vision de démocratiser le design web.' },
    { year: '2019', title: 'Premier jalon', event: 'Atteint 1 000 templates et 5 000 clients dans le monde.' },
    { year: '2021', title: 'Économie des créateurs', event: 'Lancement du programme partenaire auteur avec plus de 200 créateurs inscrits.' },
    { year: '2023', title: 'Portée mondiale', event: 'Expansion pour servir des clients dans plus de 150 pays.' },
    { year: '2024', title: 'Innovation IA', event: 'Introduction de la personnalisation et des recommandations de templates par IA.' },
  ],
  cta_headline: 'Prêt à créer quelque chose d\'exceptionnel ?',
  cta_subheadline: 'Parcourez notre collection de templates premium et trouvez le point de départ parfait pour votre prochain projet.',
  cta_primary_text: 'Voir les templates',
  cta_primary_link: '/templates',
  cta_secondary_text: 'Nous contacter',
  cta_secondary_link: '/contact',
}

const AboutUs = () => {
  const s = aboutData

  const stats = s.stats.map((st, i) => ({ ...st, icon: statIcons[i % statIcons.length] }));
  const values = s.values.map((v, i) => ({ ...v, icon: valueIcons[i % valueIcons.length], color: valueColors[i % valueColors.length] }));
  const team = s.team;
  const milestones = s.milestones;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent)]" />
        <div className="absolute top-40 -left-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-20 -right-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-4xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              {s?.hero_badge || "À propos de TemplatePro"}
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              {s?.hero_headline || "We Build the Future of"}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  {s?.hero_highlight || "Web Design"}
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 80 1 100 3C120 5 160 6 199 2.5" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {s?.hero_subheadline}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 justify-center">
              <Link to={s?.hero_cta_primary_link || "/templates"}>
                <Button variant="hero" size="lg" className="gap-2 text-base px-8">
                  {s?.hero_cta_primary_text || "Parcourir"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={s?.hero_cta_secondary_link || "/contact"}>
                <Button variant="hero-outline" size="lg" className="text-base px-8">
                  {s?.hero_cta_secondary_text || "Nous contacter"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-xs mb-6 uppercase tracking-wider">
                {s?.mission_badge || "Notre mission"}
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                {s?.mission_headline}
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                {(s?.mission_paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="mt-8 flex items-center gap-6">
                {(s?.awards || []).map((award, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i === 0 ? <Award className="w-8 h-8 text-primary" /> : <Shield className="w-8 h-8 text-primary" />}
                    <div>
                      <div className="font-bold text-foreground">{award.title}</div>
                      <div className="text-sm text-muted-foreground">{award.subtitle}</div>
                    </div>
                    {i < (s?.awards || []).length - 1 && <div className="w-px h-10 bg-border ml-6" />}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={s?.mission_image_url} alt="Team collaboration" className="w-full h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-primary/10 blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-accent/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,hsl(var(--primary)/0.04),transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-xs mb-6 uppercase tracking-wider">
              {s?.values_badge || "Nos valeurs"}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{s?.values_headline}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">{s?.values_subheadline}</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-xs mb-6 uppercase tracking-wider">
              {s?.milestones_badge || "Notre parcours"}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-foreground">{s?.milestones_headline}</motion.h2>
          </motion.div>
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`relative flex items-start gap-6 mb-12 last:mb-0 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background -translate-x-1.5 mt-5 z-10" />
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:text-right md:pr-0" : "md:text-left md:pl-0"}`}>
                  <div className="glass-card p-6 rounded-2xl border border-border/50 hover:border-primary/20 transition-colors">
                    <span className="text-sm font-bold text-primary">{m.year}</span>
                    <h3 className="font-display font-bold text-lg text-foreground mt-1">{m.title}</h3>
                    <p className="text-muted-foreground mt-1">{m.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-xs mb-6 uppercase tracking-wider">
              {s?.team_badge || "L'équipe"}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{s?.team_headline}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">{s?.team_subheadline}</motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="group">
                <div className="glass-card rounded-3xl border border-border/50 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="font-display font-bold text-xl text-white">{member.name}</h3>
                      <p className="text-sm text-white/80 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.15),transparent)]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 p-10 md:p-16 text-center">
              <motion.h2 variants={fadeUp} custom={0} className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
                {s?.cta_headline || "Prêt à créer quelque chose d'incroyable ?"}
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
                {s?.cta_subheadline}
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={s?.cta_primary_link || "/templates"}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 text-base px-8 font-semibold">
                    {s?.cta_primary_text || "Parcourir"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to={s?.cta_secondary_link || "/contact"}>
                  <Button size="lg" variant="outline" className="border-white/30 text-primary-foreground hover:bg-white/10 text-base px-8">
                    {s?.cta_secondary_text || "Nous contacter"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutUs;
