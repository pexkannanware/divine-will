"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnnouncementBar,
  AppointmentProvider,
  Footer,
  Icon,
  MobileAppointmentBar,
  Navbar,
  RevealObserver,
  SectionHeading,
} from "@/components/landing-page";
import { ContactForm } from "@/components/contact-form";
import { assessments, faqs, resources, services, testimonials, trustPoints } from "@/data/site-data";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <AppointmentProvider>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <MobileAppointmentBar />
      <RevealObserver />
    </AppointmentProvider>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="inner-hero">
      <div className="inner-hero-orbit orbit-a" />
      <div className="inner-hero-orbit orbit-b" />
      <Image className="inner-hero-logo" src="/images/logo-transparent.png" alt="" width={600} height={480} aria-hidden="true" />
      <div className="mx-auto max-w-site px-5 py-20 lg:px-8 lg:py-28">
        <div className="relative z-10 max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="inner-title mt-6">
            {title} <span>{accent}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{description}</p>
        </div>
      </div>
    </section>
  );
}

export function PageCTA({ title = "Ready when you are." }: { title?: string }) {
  return (
    <section className="bg-white px-5 py-16 lg:px-8 lg:py-24">
      <div className="inner-cta mx-auto flex max-w-site flex-col items-start justify-between gap-8 rounded-[2rem] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow text-white">A confidential first step</p>
          <h2 className="mt-4 max-w-2xl text-white">{title}</h2>
          <p className="mt-4 max-w-xl leading-7 text-blue-100/80">
            Tell us what you need. We’ll help you find the right kind of support.
          </p>
        </div>
        <Link href="/contact" className="button-light shrink-0">
          Start a conversation <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}

export function AboutPage() {
  const principles = [
    ["01", "Listen before leading", "Your experience is met with curiosity, never assumptions."],
    ["02", "Move at your pace", "Progress is not rushed or forced. We build safety first."],
    ["03", "Make insight practical", "Every conversation connects to tools you can use in real life."],
  ];

  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="About The Divine Will"
        title="Professional care that still feels"
        accent="deeply human."
        description="We created a counseling space where clinical thoughtfulness, cultural sensitivity and genuine warmth belong together."
      />
      <section className="section bg-white">
        <div className="mx-auto grid max-w-site items-center gap-14 px-5 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <div className="reveal">
            <SectionHeading
              align="left"
              eyebrow="Why we exist"
              title="A place to feel heard—not hurried."
            />
            <p className="mt-6 text-lg leading-8 text-muted">
              Emotional difficulty can make life feel smaller. The Divine Will exists to help
              people find room again: to understand what is happening, reconnect with their
              strengths and make choices with greater calm.
            </p>
            <p className="mt-5 text-lg leading-8 text-muted">
              Our work is collaborative and evidence-informed. You bring the lived experience;
              we bring professional care, perspective and practical tools.
            </p>
          </div>
          <div className="why-path reveal" aria-hidden="true">
            <div className="why-path-line" />
            <span className="why-node node-listen"><Icon name="heart" /><strong>Be heard</strong><small>Your story, without judgment</small></span>
            <span className="why-node node-understand"><Icon name="spark" /><strong>Understand</strong><small>Patterns become clearer</small></span>
            <span className="why-node node-forward"><Icon name="arrow" /><strong>Move forward</strong><small>Practical, supported steps</small></span>
          </div>
        </div>
      </section>
      <section className="section bg-mist">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionHeading eyebrow="Our way of working" title="Grounded principles, felt in every session" />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {principles.map(([number, title, copy]) => (
              <article key={number} className="principle-card reveal">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-navy text-white">
        <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="reveal">
            <p className="eyebrow text-[#A7D0F3]">What you can expect</p>
            <h2 className="mt-5 text-white">Care with clear professional foundations.</h2>
          </div>
          <div className="grid gap-3">
            {trustPoints.map((point) => (
              <div key={point} className="expectation-row reveal">
                <Icon name="check" className="h-4 w-4" /> {point}
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCTA title="Let’s find a way forward, together." />
    </SiteFrame>
  );
}

export function ServicesPage() {
  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="Counseling services"
        title="Support shaped around"
        accent="your real life."
        description="Different seasons need different kinds of care. Explore our services and find a starting point that feels right."
      />
      <section className="section bg-white">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="service-list">
            {services.map((service, index) => (
              <article key={service.title} className={`service-row service-${service.accent} reveal`}>
                <div className="service-row-art">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <span className="service-row-shade" />
                  <span className="service-row-number">{service.number}</span>
                  <span className="service-row-icon"><Icon name={service.icon} className="h-9 w-9" /></span>
                </div>
                <div className="service-row-copy">
                  <p className="eyebrow">For {index < 2 ? "young minds" : index < 6 ? "everyday life" : "deeper insight"}</p>
                  <h2>{service.title}</h2>
                  <p>{service.description} Sessions are paced thoughtfully, with goals and practical next steps shaped together.</p>
                  <div className="mt-6 flex flex-wrap gap-5">
                    <Link href={service.slug === "workshops-training" ? "/workshops-training" : `/services/${service.slug}`} className="text-link">Read more <Icon name="arrow" /></Link>
                    <Link href="/contact" className="text-link">Ask about it <Icon name="mail" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCTA title="Not sure which service fits? That’s completely okay." />
    </SiteFrame>
  );
}

export function AssessmentsPage() {
  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="Private self-assessments"
        title="A quiet check-in with"
        accent="how you’re feeling."
        description="Brief reflection tools can help you notice patterns, name what feels difficult and decide whether a conversation may help."
      />
      <section className="section bg-white">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="assessment-start reveal">
            <div><span>Ready when you are</span><h2>See what may need a little more care.</h2><p>20 private questions · about 4 minutes · instant results across all 8 areas</p></div>
            <Link href="/assessments/emotional-wellbeing" className="assessment-start-button">Start Assessment <Icon name="arrow" /></Link>
          </div>
          <div className="assessment-layout">
            <div className="reveal">
              <SectionHeading
                align="left"
                eyebrow="What the check-in explores"
                title="20 questions. 8 areas of emotional well-being."
                description="The assessment looks across all eight areas and shows which ones may deserve more care right now."
              />
              <div className="privacy-note mt-8">
                <Icon name="lock" />
                <p><strong>Private by design.</strong><br />These tools do not store or transmit your responses.</p>
              </div>
            </div>
            <div className="assessment-cards">
              {assessments.map((item, index) => (
                <Link href={`/assessments/${item.slug}`} className="assessment-card reveal" key={item.slug} aria-label={`Start the assessment with ${item.title} as your focus`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}<Icon name="arrow" /></h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="assessment-disclaimer reveal">
            <Icon name="spark" className="h-7 w-7" />
            <div>
              <h3>A starting point, not a diagnosis</h3>
              <p>Self-assessments offer reflection and preliminary screening only. A qualified professional can help you understand results in the context of your full experience.</p>
            </div>
          </div>
        </div>
      </section>
      <PageCTA title="Want help making sense of what you’re feeling?" />
    </SiteFrame>
  );
}

export function TestimonialsPage() {
  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="Client reflections"
        title="Stories of feeling heard and"
        accent="moving forward."
        description="Every journey is personal. These reflections are shared by people who found greater clarity, steadiness and hope through counselling."
      />
      <section className="testimonials-page section">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="testimonials-page-grid">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.id} className="testimonial-card reveal">
                <div className="font-heading text-5xl leading-none text-blue/30">“</div>
                <blockquote className="mt-3 text-lg leading-8 text-ink">{testimonial.quote}</blockquote>
                <figcaption className="mt-8 border-t border-slate-200 pt-5 text-sm font-bold text-navy">
                  {testimonial.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <PageCTA title="Your story deserves the same care and attention." />
    </SiteFrame>
  );
}

function ResourceVisual({ image, alt, featured = false }: { image: string; alt: string; featured?: boolean }) {
  return (
    <div className={`article-visual ${featured ? "article-featured" : ""}`}>
      <Image src={image} alt={alt} fill sizes={featured ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 33vw"} />
    </div>
  );
}

export function ResourcesPage() {
  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="Wellness insights"
        title="Thoughtful guidance for"
        accent="everyday moments."
        description="Short, compassionate reads to help you understand emotions, relationships, pressure and the small practices that support well-being."
      />
      <section className="section bg-white">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="resource-feature reveal">
            <ResourceVisual image={resources[0].image} alt={resources[0].imageAlt} featured />
            <div>
              <p className="eyebrow">Featured reflection</p>
              <h2>{resources[0].title}</h2>
              <p>{resources[0].excerpt}</p>
              <Link href={`/resources/${resources[0].slug}`} className="text-link mt-7">Read the insight <Icon name="arrow" /></Link>
            </div>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {resources.slice(1).map((resource) => (
              <article key={resource.title} className="article-card reveal">
                <ResourceVisual image={resource.image} alt={resource.imageAlt} />
                <div className="p-7">
                  <p className="eyebrow">{resource.category}</p>
                  <h3 className="mt-3 text-2xl">{resource.title}</h3>
                  <p className="mt-4 leading-7 text-muted">{resource.excerpt}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5 text-sm text-muted">
                    <span>{resource.time}</span>
                    <Link href={`/resources/${resource.slug}`} aria-label={`Read ${resource.title}`}><Icon name="arrow" className="h-4 w-4 text-navy" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCTA title="Sometimes reading helps. Sometimes talking helps more." />
    </SiteFrame>
  );
}

export function FAQPage() {
  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="Questions, answered gently"
        title="Clarity can make the first step"
        accent="feel lighter."
        description="Here are the practical things people often want to know before beginning counseling."
      />
      <section className="section bg-white">
        <div className="mx-auto grid max-w-site gap-14 px-5 lg:grid-cols-[.65fr_1.35fr] lg:px-8">
          <aside className="faq-aside reveal">
            <span className="faq-bubble"><Icon name="spark" className="h-8 w-8" /></span>
            <h2>It’s okay to ask.</h2>
            <p>No question is too small when you are deciding whether support feels right.</p>
            <Link href="/contact" className="button-primary mt-7">Ask something else</Link>
          </aside>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="faq-detail reveal" open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                  <i />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <PageCTA />
    </SiteFrame>
  );
}

export function ContactPage() {
  return (
    <SiteFrame>
      <InteriorHero
        eyebrow="Contact The Divine Will"
        title="A simple, private way to"
        accent="begin."
        description="Share only what you are comfortable sharing. Our team will respond with care and help you choose the next step."
      />
      <section className="section bg-white">
        <div className="mx-auto grid max-w-site gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="contact-panel reveal">
            <p className="eyebrow text-[#A7D0F3]">Reach us directly</p>
            <h2 className="mt-5 text-white">We’re here to listen.</h2>
            <p className="mt-5 leading-7 text-blue-100/80">For service questions, support enquiries or help choosing the right next step.</p>
            <div className="mt-10 grid gap-4">
              <a href="tel:+919884619519" className="contact-method"><Icon name="phone" /><span><small>Call us</small>+91 98846 19519</span></a>
              <a href="mailto:manjubashini@thedivinewill.in" className="contact-method"><Icon name="mail" /><span><small>Email us</small>manjubashini@thedivinewill.in</span></a>
              <div className="contact-method"><Icon name="clock" /><span><small>Working hours</small>Monday–Saturday, 9 AM–7 PM</span></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteFrame>
  );
}
