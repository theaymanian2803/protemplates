import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Refunds = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Refund Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                At TemplatePro, we stand behind the quality of our templates. We want every customer to be completely satisfied with their purchase. If something isn't right, we'll work to make it right.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may request a refund within <strong className="text-foreground">14 days</strong> of your purchase if:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>The template has a significant defect or bug that we cannot resolve</li>
                <li>The template does not match its description or preview</li>
                <li>You were charged incorrectly (duplicate payments, wrong amount)</li>
                <li>You accidentally purchased the same template twice</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Non-Refundable Cases</h2>
              <p className="text-muted-foreground leading-relaxed">
                Refunds cannot be issued in the following situations:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>You changed your mind after downloading the template files</li>
                <li>You lack the technical skills to use or customize the template</li>
                <li>The template works as described but doesn't meet your subjective expectations</li>
                <li>More than 14 days have passed since purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, email us at <strong className="text-foreground">uncacademycode@gmail.com</strong> with your order number and a description of the issue. Our team will review your request and respond within 2 business days. Approved refunds are processed back to your original payment method within 5–10 business days.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">All Access Pass Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                All Access Pass purchases are eligible for a refund within 14 days if you haven't downloaded more than 3 templates. Once you've downloaded more than 3 templates, the pass is considered fully used and is non-refundable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Need Help?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Before requesting a refund, we encourage you to <Link to="/contact" className="text-primary hover:underline">contact our support team</Link>. Many issues can be resolved quickly with our help — we're here to assist you.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Refunds;
