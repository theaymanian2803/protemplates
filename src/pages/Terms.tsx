import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using TemplatePro, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">2. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed">
                To purchase templates, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">3. Purchases & Licensing</h2>
              <p className="text-muted-foreground leading-relaxed">
                All template purchases are subject to our licensing terms. A Regular License permits use in a single end product. An Extended License permits use in products sold to end users. The All Access Pass grants a Regular License for every template in our catalog, including future additions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All templates, designs, code, and content on TemplatePro are owned by TemplatePro or its licensors. Purchasing a template grants you a license to use it — not ownership of the intellectual property. You may not resell, redistribute, or sublicense the template source files.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">5. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may not use our templates for illegal purposes, resell template files as-is, claim authorship of any template design, or use templates in a way that competes with TemplatePro. Violation of these terms may result in license revocation without refund.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">6. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Significant changes will be communicated via email or a prominent notice on our website. Continued use after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">7. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, contact us at uncacademycode@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Terms;
