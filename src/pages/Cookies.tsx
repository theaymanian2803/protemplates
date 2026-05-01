import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, keep you logged in, and understand how you use our site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Essential Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are required for TemplatePro to function properly. They handle authentication sessions, shopping cart data, and security tokens. Without these cookies, the site cannot operate correctly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Preference Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use preference cookies to remember your settings, such as your chosen theme (light or dark mode) and any display preferences. These cookies enhance your browsing experience but are not strictly necessary.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Analytics Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use analytics cookies to understand how visitors interact with our marketplace — which pages are most visited, which templates are popular, and how users navigate the site. This data is anonymized and used solely to improve our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies or delete them. Please note that disabling essential cookies may prevent you from using certain features like adding items to your cart or logging in.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies, please reach out at uncacademycode@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cookies;
