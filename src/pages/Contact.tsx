import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useContactUs } from '@/hooks/useSiteSettings'
import { supabase } from '@/integrations/supabase/client'
import {
  Clock,
  FileQuestion,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const methodIcons = [Mail, Phone, MessageSquare, MapPin]

const quickLinks = [
  { icon: FileQuestion, title: 'FAQ', description: 'Find quick answers', href: '/faq' },
  {
    icon: Headphones,
    title: 'Support Center',
    description: 'Get technical help',
    href: '/faq#support',
  },
]

const Contact = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: s } = useContactUs()

  const contactMethods = (s?.contact_methods || []).map((m, i) => ({
    ...m,
    icon: methodIcons[i % methodIcons.length],
  }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const orderNumber = formData.get('orderNumber') as string
    const rawMessage = formData.get('message') as string

    const fullName = `${firstName} ${lastName}`.trim()
    const finalMessage = orderNumber ? `Order Number: ${orderNumber}\n\n${rawMessage}` : rawMessage

    const { error } = await supabase.from('contacts').insert([
      {
        name: fullName,
        email: email,
        subject: subject,
        message: finalMessage,
      },
    ])

    setIsSubmitting(false)

    if (error) {
      toast({ title: 'Error sending message', description: error.message, variant: 'destructive' })
      return
    }

    toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." })
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob-float" />
        <div
          className="absolute bottom-10 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob-float"
          style={{ animationDelay: '2s' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Mail className="w-4 h-4" />
              {s?.hero_badge || 'Get in Touch'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              {s?.hero_headline || "We'd Love to"}{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {s?.hero_highlight || 'Hear From You'}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {s?.hero_subheadline ||
                'Have a question, feedback, or need help? Our team is ready to assist you.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="glass-card p-6 rounded-2xl border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <p className="text-sm font-medium text-primary">{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8 rounded-3xl border border-border/50">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  {s?.form_title || 'Send us a Message'}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {s?.form_subtitle ||
                    "Fill out the form below and we'll get back to you as soon as possible."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select name="subject" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales Question</SelectItem>
                        <SelectItem value="licensing">Licensing Help</SelectItem>
                        <SelectItem value="refund">Refund Request</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number (Optional)</Label>
                    <Input id="orderNumber" name="orderNumber" placeholder="TP-XXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6 rounded-2xl border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">Quick Resources</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{link.title}</div>
                        <div className="text-sm text-muted-foreground">{link.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="glass-card p-6 rounded-2xl border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {(s?.business_hours || []).map((h, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="text-foreground">{h.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-primary/10 text-sm">
                  <span className="text-primary font-medium">
                    {s?.live_chat_note || '💬 Live chat available 24/7'}
                  </span>
                </div>
              </div>

              {/* Response Time */}
              <div className="glass-card p-6 rounded-2xl border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">Expected Response Time</h3>
                <div className="space-y-3">
                  {(s?.response_times || []).map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-accent' : 'bg-secondary'}`}
                      />
                      <span className="text-sm text-muted-foreground">
                        {r.label}: {r.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {s?.location_title || 'Our Location'}
            </h2>
            <p className="text-muted-foreground">
              {s?.location_subtitle || 'Visit us at our headquarters'}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-border/50 h-[400px]">
              <iframe
                title="Our location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${(s?.location_lng ?? -74.006) - 0.015},${(s?.location_lat ?? 40.7128) - 0.01},${(s?.location_lng ?? -74.006) + 0.015},${(s?.location_lat ?? 40.7128) + 0.01}&layer=mapnik&marker=${s?.location_lat ?? 40.7128},${s?.location_lng ?? -74.006}`}
              />
            </div>
            <div className="flex flex-col justify-center glass-card p-8 rounded-3xl border border-border/50">
              <MapPin className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground mb-1">
                {s?.location_address_line1 || '123 Design Street'}
              </p>
              <p className="text-muted-foreground mb-6">
                {s?.location_address_line2 || 'New York, NY 10001'}
              </p>
              <a
                href={`https://www.openstreetmap.org/?mlat=${s?.location_lat ?? 40.7128}&mlon=${s?.location_lng ?? -74.006}#map=${s?.location_zoom ?? 15}/${s?.location_lat ?? 40.7128}/${s?.location_lng ?? -74.006}`}
                target="_blank"
                rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <MapPin className="w-4 h-4" /> Get Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Contact
