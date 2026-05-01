import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account or make a purchase on TemplatePro, we collect your name, email address, and payment information. We also collect usage data such as pages visited, templates viewed, and search queries to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use your information to process transactions, deliver purchased templates, send order confirmations, provide customer support, and improve our marketplace. We may also send you updates about new templates and features if you've opted in to our newsletter.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">3. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures including SSL encryption, secure payment processing through PayPal, and encrypted data storage. Your payment details are never stored on our servers — they are handled directly by our payment processor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use essential cookies to maintain your session and remember your preferences (such as dark mode). We also use analytics cookies to understand how visitors interact with our site. You can disable cookies in your browser settings, though this may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use third-party services for payment processing (PayPal), hosting, and analytics. These services have their own privacy policies and we encourage you to review them. We do not sell or share your personal data with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal data at any time through your profile settings. You can also request a full export of your data or account deletion by contacting us at uncacademycode@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at uncacademycode@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Privacy;
