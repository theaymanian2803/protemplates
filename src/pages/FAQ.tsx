import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle, FileText, Shield, CreditCard, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    id: "templates",
    icon: FileText,
    title: "Templates & Products",
    questions: [
      {
        q: "What file formats are included with each template?",
        a: "Each template includes source files in HTML, CSS, JavaScript, and React/TypeScript formats. You'll also receive PSD/Figma design files, documentation, and all necessary assets like fonts and images.",
      },
      {
        q: "Are the templates responsive and mobile-friendly?",
        a: "Yes! All our templates are fully responsive and tested across multiple devices and screen sizes. They work seamlessly on desktop, tablet, and mobile devices.",
      },
      {
        q: "Can I customize the templates to match my brand?",
        a: "Absolutely! Our templates are built with customization in mind. You can easily change colors, fonts, images, and content. Most templates use CSS variables or Tailwind CSS for quick theming.",
      },
      {
        q: "Do templates include documentation?",
        a: "Yes, every template comes with comprehensive documentation that covers installation, customization, and deployment. We also provide video tutorials for popular templates.",
      },
      {
        q: "Are images and fonts included in the templates?",
        a: "Demo images are for preview purposes only. However, we provide links to free stock photo resources. Fonts used are typically Google Fonts or other free-to-use typefaces that are included.",
      },
    ],
  },
  {
    id: "licensing",
    icon: Shield,
    title: "Licensing & Usage",
    questions: [
      {
        q: "What's the difference between Regular and Extended licenses?",
        a: "A Regular License allows you to use the template for a single end product (website/app) for yourself or one client. An Extended License allows unlimited end products and can be used for items sold to multiple users.",
      },
      {
        q: "Can I use a template for multiple projects?",
        a: "With a Regular License, you can only use the template for one project. If you need to use it for multiple projects, you'll need to purchase additional licenses or upgrade to an Extended License.",
      },
      {
        q: "Can I resell or redistribute the template?",
        a: "No, you cannot resell or redistribute the template files themselves. However, you can use them to create end products for clients. The Extended License allows for more commercial flexibility.",
      },
      {
        q: "Do I need to credit TemplatePro when using a template?",
        a: "No, attribution is not required for Regular or Extended licenses. However, we always appreciate a link back to our site!",
      },
      {
        q: "Can I use templates for client projects?",
        a: "Yes! You can use our templates for client projects. Each license covers one end product, so if you're building websites for multiple clients, you'll need a license for each project.",
      },
    ],
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Payments & Refunds",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are processed securely through our payment partners.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard SSL encryption and never store your full credit card details. All payments are processed through PCI-compliant payment processors.",
      },
      {
        q: "Do you offer refunds?",
        a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact our support team for a full refund. Note that refunds may not apply if you've already used the template.",
      },
      {
        q: "Are there any hidden fees or subscriptions?",
        a: "No hidden fees! You pay once and own the template forever. There are no recurring charges unless you opt for our optional support extension.",
      },
      {
        q: "Do you offer discounts for bulk purchases?",
        a: "Yes! We offer volume discounts for agencies and businesses purchasing multiple templates. Contact our sales team for custom pricing.",
      },
    ],
  },
  {
    id: "support",
    icon: Headphones,
    title: "Support & Updates",
    questions: [
      {
        q: "How long is support included with my purchase?",
        a: "Each purchase includes 6 months of technical support from the template author. You can extend support for an additional 12 months at a discounted rate during checkout.",
      },
      {
        q: "What does support cover?",
        a: "Support covers questions about the template's features, bug fixes, and basic customization guidance. It does not include custom development, installation services, or third-party plugin support.",
      },
      {
        q: "How do I get help if I have issues?",
        a: "You can reach out through our support ticket system, live chat, or email. Most inquiries are answered within 24 hours during business days.",
      },
      {
        q: "Do I get free updates?",
        a: "Yes! You receive free lifetime updates for any template you purchase. Updates include bug fixes, security patches, and new features when available.",
      },
      {
        q: "Can I request custom features or modifications?",
        a: "While support doesn't cover custom development, many of our authors offer custom development services. You can contact them directly or use our custom project request feature.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about our templates, licensing, payments, and support.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 border-y border-border/50 sticky top-16 bg-background/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{category.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={category.id}
              id={category.id}
              className="mb-16 last:mb-0 scroll-mt-40"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {category.title}
                </h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.id}-${index}`}
                    className="glass-card border border-border/50 rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-border/50 text-center max-w-3xl mx-auto">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </Button>
              </Link>
              <Button variant="hero-outline" size="lg">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQ;
