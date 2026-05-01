import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const License = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">License Agreement</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Regular License</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Regular License grants you the right to use a template in a <strong className="text-foreground">single end product</strong> for yourself or a client. The end product must not be sold or distributed to end users. You may customize, modify, and build upon the template for your project.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Use in one project (personal or client)</li>
                <li>Modify and customize freely</li>
                <li>Cannot be resold or redistributed</li>
                <li>Cannot be used in a SaaS or product sold to users</li>
                <li>Includes 6 months of support</li>
                <li>Lifetime updates included</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Extended License</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Extended License grants you the right to use a template in a <strong className="text-foreground">single end product that is sold or distributed to end users</strong>. This includes SaaS applications, themes sold on marketplaces, and products with paying customers.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Use in one commercial product</li>
                <li>End product can be sold to users</li>
                <li>Modify and customize freely</li>
                <li>Cannot resell the template source files directly</li>
                <li>Includes 12 months of priority support</li>
                <li>Lifetime updates included</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">All Access Pass</h2>
              <p className="text-muted-foreground leading-relaxed">
                The All Access Pass is a one-time purchase of $300 that grants a Regular License for <strong className="text-foreground">every template</strong> in our catalog, including all future templates added to the marketplace. It's the best value for agencies and developers who work on multiple projects.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Access to all current templates</li>
                <li>All future templates included at no extra cost</li>
                <li>Regular License for each template</li>
                <li>Priority support</li>
                <li>Lifetime updates for all templates</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">What You Cannot Do</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Resell, redistribute, or sublicense template source files</li>
                <li>Claim authorship of any template design</li>
                <li>Use templates to create competing products or marketplaces</li>
                <li>Remove copyright or attribution notices from source files</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you need clarification on licensing, contact us at uncacademycode@gmail.com. We're happy to help you choose the right license for your project.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default License;
