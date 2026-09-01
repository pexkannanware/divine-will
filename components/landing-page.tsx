"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import {
  assessments,
  faqs,
  navigation,
  processSteps,
  resources,
  services,
  testimonials,
  trustPoints,
} from "@/data/site-data";

type IconName =
  | "arrow"
  | "book"
  | "briefcase"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "hands"
  | "heart"
  | "lock"
  | "mail"
  | "menu"
  | "people"
  | "phone"
  | "pin"
  | "spark"
  | "workshop";

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName | string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
    briefcase: <><rect width="18" height="13" x="3" y="7" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /><path d="m4 6 5-3 6 4 5-4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    hands: <><path d="M7 11V5a2 2 0 0 1 4 0v5M11 9V4a2 2 0 0 1 4 0v7" /><path d="M15 10V6a2 2 0 0 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6.4-4.2L3 13a2 2 0 0 1 3.7-1.5L8 14" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    lock: <><rect width="16" height="11" x="4" y="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    spark: <><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8z" /><path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8zM19 3l.6 1.4L21 5l-1.4.6L19 7l-.6-1.4L17 5l1.4-.6z" /></>,
    workshop: <><path d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3Z" /><path d="M9 22h6M9 16h6M12 1V0M4.2 4.2l-1-1M19.8 4.2l1-1" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="mt-5 text-lg leading-8 text-muted">{description}</p>}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-navy px-5 py-2.5 text-sm text-white">
      <div className="mx-auto flex max-w-site items-center justify-center gap-4 sm:justify-between">
        <p>Confidential online and in-person counselling available</p>
        <a className="hidden items-center gap-2 font-semibold sm:flex" href="tel:+919884619519">
          <Icon name="phone" className="h-4 w-4" />
          Call us
        </a>
      </div>
    </div>
  );
}

export function AppointmentButton({
  children,
  className = "button-primary",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new Event("open-appointment"));
      }}
    >
      {children}
    </button>
  );
}

export function AppointmentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-appointment", show);
    return () => window.removeEventListener("open-appointment", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="appointment-modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false);
    }}>
      <div className="appointment-dialog" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
        <button type="button" className="appointment-close" onClick={() => setOpen(false)} aria-label="Close appointment form">
          <Icon name="close" />
        </button>
        <span id="appointment-title" className="sr-only">Book an appointment</span>
        <ContactForm compact onSubmitted={() => setOpen(false)} />
      </div>
    </div>
  );
}

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppointmentModal />
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="navbar-inner mx-auto flex max-w-site items-center justify-between px-4 lg:px-8">
        <Link href="/" className="brand-lockup flex min-w-0 items-center gap-3" aria-label="The Divine Will home">
          <Image
            src="/images/logo-transparent.png"
            alt="The Divine Will logo"
            width={70}
            height={56}
            priority
            className="brand-logo object-contain"
          />
          <span className="min-w-0">
            <strong className="brand-name block font-heading tracking-[-.025em] text-navy">
              The Divine Will
            </strong>
            <span className="brand-tagline mt-1 block font-semibold text-muted">
              Empowering minds, Enriching lives
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <AppointmentButton className="button-primary nav-appointment">
          Book an Appointment
        </AppointmentButton>
        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 text-navy xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-slate-100 bg-white px-5 py-4 shadow-soft xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-site gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 font-semibold ${
                  pathname === item.href ? "bg-sky text-navy" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <AppointmentButton className="button-primary mt-2" onClick={() => setOpen(false)}>
              Book an Appointment
            </AppointmentButton>
          </div>
        </nav>
      )}
    </header>
  );
}

function HeroSection() {
  const trust = [
    ["lock", "Confidential Support"],
    ["spark", "Evidence-Based Care"],
    ["people", "Online & In-Person"],
  ];
  return (
    <section id="home" className="relative overflow-hidden bg-mist pb-20 pt-14 lg:pb-28 lg:pt-20">
      <div className="hero-orb left-[-5rem] top-24 bg-warm" />
      <div className="hero-orb right-[-6rem] top-4 bg-mint" />
      <Image className="hero-logo-watermark" src="/images/logo-transparent.png" alt="" width={760} height={610} aria-hidden="true" />
      <div className="mx-auto grid max-w-site grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:px-8">
        <div className="relative z-10 min-w-0">
          <p className="eyebrow">Compassionate <i /> Confidential <i /> Professional</p>
          <h1 className="mt-6 max-w-2xl font-heading text-[2.65rem] font-semibold leading-[1.08] tracking-[-.045em] text-ink sm:text-6xl lg:text-[4.35rem]">
            Healing Minds. <span className="text-blue">Restoring Hearts.</span> Empowering Lives.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            At The Divine Will, we provide a safe, confidential and
            non-judgmental space where you can be heard, understood and supported through
            life’s emotional challenges.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AppointmentButton className="button-primary w-full sm:w-auto">
              Book an Appointment <Icon name="arrow" />
            </AppointmentButton>
            <Link href="/services" className="button-secondary w-full sm:w-auto">
              Explore Our Services
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {trust.map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-semibold text-navy">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-blue shadow-sm">
                  <Icon name={icon} className="h-4 w-4" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto min-w-0 w-full max-w-[680px]">
          <div className="absolute -left-4 top-12 z-10 h-16 w-16 rounded-[42%_58%_55%_45%] bg-warm/90 motion-float" />
          <div className="absolute -right-4 bottom-14 z-10 grid h-16 w-16 place-items-center rounded-full bg-white/95 text-blue shadow-soft motion-float-delayed">
            <Icon name="heart" className="h-7 w-7" />
          </div>
          <div className="overflow-hidden rounded-[2rem] border-[10px] border-white bg-white shadow-soft sm:rounded-[2.5rem]">
            <Image
              src="/images/counselling-hero.webp"
              alt="A calm counselor listening supportively to a person who feels overwhelmed"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="aspect-[1.18/1] h-auto w-full object-cover object-[58%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const values = [
    ["heart", "Compassionate Care", "Warm support grounded in listening, dignity and respect."],
    ["spark", "Personalised Guidance", "Care shaped around your story, strengths and goals."],
    ["lock", "Ethical & Confidential", "Professional practice where your privacy comes first."],
  ];
  return (
    <section id="about" className="section bg-white">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <SectionHeading
              align="left"
              eyebrow="About our centre"
              title="A safe space to pause, understand and move forward."
            />
            <p className="mt-6 text-lg leading-8 text-muted">
              The Divine Will promotes mental, emotional and psychological
              well-being through evidence-based counseling, assessments and personalized support.
              Every journey is approached with empathy, respect and an understanding of the
              individual’s unique experiences.
            </p>
            <Link href="/about" className="text-link mt-8">
              Discover how we can support you <Icon name="arrow" />
            </Link>
          </div>
          <div className="about-centre-photo reveal">
            <Image
              src="/images/about-centre-v2.png"
              alt="A calm counselling room with two comfortable chairs prepared for a private conversation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span><Icon name="lock" className="h-4 w-4" /> A private space to be heard</span>
          </div>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {values.map(([icon, title, description]) => (
            <article key={title} className="value-card reveal">
              <span className="icon-box"><Icon name={icon} /></span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article className={`service-card service-${service.accent} reveal`}>
      <div className="service-photo">
        <Image
          src={service.image}
          alt={service.imageAlt}
          width={700}
          height={500}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="service-symbol"><Icon name={service.icon} className="h-6 w-6" /></span>
        <span className="service-index">{service.number}</span>
      </div>
      <div className="service-copy">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <Link href={service.slug === "workshops-training" ? "/workshops-training" : `/services/${service.slug}`} className="text-link mt-auto pt-6">
          Explore support <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}

function ServicesGrid() {
  return (
    <section id="services" className="section bg-mist">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our services"
          title="Support designed around real life"
          description="Professional guidance for every age, relationship and stage of life."
        />
        <div className="mt-16 grid gap-7 md:grid-cols-2">
          {services.slice(0, 4).map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>
        <div className="mt-12 text-center">
          <Link href="/services" className="button-secondary">
            View all counseling services <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AssessmentSection() {
  const featured = assessments.slice(0, 4);
  const [moodPosition, setMoodPosition] = useState({ x: 0, y: 0 });

  function moveMood(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 22;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 22;
    setMoodPosition({ x, y });
  }
  return (
    <section id="assessments" className="section assessment-home relative overflow-hidden">
      <div className="relative mx-auto max-w-site px-5 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="A moment for yourself"
            title="How have you really been feeling?"
            description="A private, two-minute check-in can help turn a vague feeling into something you can understand—and choose what to do next."
          />
          <Link href="/assessments" className="button-primary mt-9">
            Begin a private check-in <Icon name="arrow" />
          </Link>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Icon name="lock" className="h-4 w-4 text-blue" /> No account. No saved answers. No judgment.
          </p>
        </div>
          <div
            className="mood-checkin reveal"
            onPointerMove={moveMood}
            onPointerDown={moveMood}
            onPointerLeave={() => setMoodPosition({ x: 0, y: 0 })}
          >
            <div
              className="mood-orbit"
              aria-hidden="true"
              style={{
                "--mood-x": `${moodPosition.x}px`,
                "--mood-y": `${moodPosition.y}px`,
                "--mood-rx": `${moodPosition.y * -.18}deg`,
                "--mood-ry": `${moodPosition.x * .18}deg`,
              } as React.CSSProperties}
            >
              <span className="mood-ring ring-a" />
              <span className="mood-ring ring-b" />
              <span className="mood-pulse" />
              <div className="mood-centre">
                <small>Today I feel</small>
                <strong>somewhere<br />in between</strong>
              </div>
              <span className="mood-word word-one">Heavy</span>
              <span className="mood-word word-two">Restless</span>
              <span className="mood-word word-three">Hopeful</span>
              <span className="mood-word word-four">Unsure</span>
            </div>
          </div>
        </div>
        <div className="assessment-paths mt-20">
          {featured.map((assessment, index) => (
            <div className="assessment-path reveal" key={assessment.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><small>Reflect on</small><h3>{assessment.title}</h3></div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-muted">
          Self-assessments support awareness, not diagnosis. If something feels urgent or overwhelming,
          speaking with a qualified professional is the safest next step.
        </p>
      </div>
    </section>
  );
}

function CounselingProcess() {
  return (
    <section className="section process-section overflow-hidden bg-white">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <SectionHeading
          eyebrow="How counseling works"
          title="A gentle path, taken at your pace"
          description="No complicated process. Just four considered steps from first contact to meaningful support."
        />
        <div className="process-journey mt-16">
          <div className="process-flow" aria-hidden="true"><span /></div>
          {processSteps.map((step, index) => (
            <article key={step.title} className="process-step reveal" style={{ "--step": index } as React.CSSProperties}>
              <div className="process-number">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/contact" className="button-secondary">Take your first step <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section overflow-hidden bg-navy text-white">
      <div className="mx-auto grid max-w-site items-center gap-14 px-5 lg:grid-cols-[1fr_.9fr] lg:px-8">
        <div className="reveal">
          <p className="eyebrow text-[#A7D0F3]">Why choose us</p>
          <h2 className="mt-5 max-w-2xl text-white">Care built on trust, clarity and genuine connection.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/80">
            Thoughtful support should feel human. We bring professional practice and a deeply
            respectful approach together, so you can feel safe enough to make meaningful change.
          </p>
        </div>
        <div className="trust-composition reveal">
          <div className="ripple ripple-one" />
          <div className="ripple ripple-two" />
          <div className="relative z-10 grid gap-3">
            {trustPoints.map((point) => (
              <div key={point} className="trust-point">
                <span><Icon name="check" className="h-4 w-4" /></span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const featuredTestimonials = [testimonials[0], testimonials[2], testimonials[5]];

  return (
    <section id="testimonials" className="testimonials-section section">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <div className="testimonial-intro reveal">
          <div>
            <p className="eyebrow">Client reflections</p>
            <h2 className="mt-5 max-w-2xl">Quiet words from people we’ve supported</h2>
          </div>
          <div className="testimonial-intro-copy">
            <p>Real experiences of feeling heard, finding clarity and moving forward with greater steadiness.</p>
            <Link href="/testimonials" className="text-link mt-6">
              Read all 7 testimonials <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="testimonials-home-grid">
          {featuredTestimonials.map((testimonial, index) => (
            <figure key={testimonial.id} className="testimonial-card home-testimonial-card reveal">
              <div className="testimonial-card-top">
                <span className="testimonial-quote" aria-hidden="true">“</span>
                <span className="testimonial-number">0{index + 1}</span>
              </div>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <span className="testimonial-person"><Icon name="heart" className="h-4 w-4" /></span>
                <span>
                  <strong>{testimonial.attribution}</strong>
                  <small>Client reflection</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceArtwork({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="resource-art">
      <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" />
    </div>
  );
}

function ResourcesSection() {
  return (
    <section id="insights" className="section bg-white">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <SectionHeading
          eyebrow="Wellness insights"
          title="Helpful guidance for everyday well-being"
          description="Clear, compassionate perspectives you can return to at your own pace."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <article key={resource.title} className="resource-card reveal">
              <ResourceArtwork image={resource.image} alt={resource.imageAlt} />
              <div className="p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[.15em] text-blue">{resource.category}</p>
                <h3 className="mt-3 text-2xl">{resource.title}</h3>
                <p className="mt-4 leading-7 text-muted">{resource.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <Icon name="clock" className="h-4 w-4" /> {resource.time}
                  </span>
                  <Link href={`/resources/${resource.slug}`} className="text-link">
                    Read article <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [expanded, setExpanded] = useState(0);
  return (
    <section id="faq" className="section bg-mist">
      <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-[.68fr_1.32fr] lg:gap-20 lg:px-8">
        <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="Frequently asked"
            title="A little clarity before you begin."
            description="If your question is not answered here, we are only a message away."
          />
          <Link href="/faq" className="text-link mt-7">
            Ask us a question <Icon name="arrow" />
          </Link>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 reveal">
          {faqs.map((faq, index) => {
            const isOpen = expanded === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-heading text-lg font-semibold text-ink sm:text-xl"
                    onClick={() => setExpanded(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                  >
                    {faq.question}
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-blue transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <Icon name="chevron" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`accordion-grid ${isOpen ? "open" : ""}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-12 leading-7 text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AppointmentCTA() {
  return (
    <section id="contact" className="bg-white px-5 py-16 lg:px-8 lg:py-24">
      <div className="cta-panel mx-auto max-w-site overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12 lg:rounded-[2.5rem] lg:py-20">
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="eyebrow text-[#B7D9F5]">We’re here when you’re ready</p>
          <h2 className="mt-5 text-white">Ready to begin your healing journey?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100/85">
            Take the first step towards a healthier, more balanced and fulfilling life. We’re
            here to support you.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <AppointmentButton className="button-light">
              Book Your Appointment <Icon name="arrow" />
            </AppointmentButton>
            <a href="https://wa.me/919884619519" className="button-outline-light">
              WhatsApp Us
            </a>
          </div>
          <p className="mt-7 flex items-center justify-center gap-2 text-sm text-blue-100/75">
            <Icon name="lock" className="h-4 w-4" />
            Your enquiry will be handled privately and with care.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer pb-28 text-white md:pb-8">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <div className="footer-intro">
          <div>
            <p className="eyebrow text-white">A calmer next chapter</p>
            <h2 className="mt-4 max-w-2xl text-white">You don’t have to figure everything out alone.</h2>
          </div>
          <Link href="/contact" className="button-light shrink-0">
            Talk to our team <Icon name="arrow" />
          </Link>
        </div>
        <div className="grid gap-12 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 text-white">
              <Image
                src="/images/logo-transparent.png"
                alt="The Divine Will logo"
                width={60}
                height={48}
                className="h-12 w-[60px] object-contain"
              />
              <span>
                <strong className="block font-heading text-lg">The Divine Will</strong>
                <span className="text-xs">Empowering minds, enriching lives</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-7">
              Compassionate, confidential support for emotional and psychological well-being,
              online and in person.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm text-white">
              <span className="availability-dot" />
              Accepting new clients
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Explore</h3>
            <div className="footer-links">
              {navigation.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Popular support</h3>
            <div className="footer-links">
              {services.slice(0, 5).map((service) => (
                <Link key={service.title} href={service.slug === "workshops-training" ? "/workshops-training" : `/services/${service.slug}`}>{service.title}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Contact</h3>
            <div className="grid gap-4">
              <p className="footer-contact"><Icon name="pin" /> Address details to be added</p>
              <a className="footer-contact" href="tel:+919884619519"><Icon name="phone" /> +91 98846 19519</a>
              <a className="footer-contact" href="mailto:manjubashini@thedivinewill.in"><Icon name="mail" /> manjubashini@thedivinewill.in</a>
              <p className="footer-contact"><Icon name="clock" /> Mon–Sat, 9:00 AM–7:00 PM</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-7 text-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms & Conditions</Link>
            <Link href="/faq">Emergency Support</Link>
          </div>
          <p>
            © {new Date().getFullYear()} The Divine Will. <span>Designed and developed by KappLabs</span>
          </p>
        </div>
        <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-5">
          This website is not an emergency service. If you or someone else is in immediate
          danger, contact your local emergency services or visit the nearest emergency facility.
        </p>
      </div>
    </footer>
  );
}

export function MobileAppointmentBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(22,59,103,.1)] backdrop-blur md:hidden">
      <AppointmentButton className="button-primary w-full">Book an Appointment</AppointmentButton>
    </div>
  );
}

export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

export function LandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <TestimonialsSection />
        <ServicesGrid />
        <AssessmentSection />
        <CounselingProcess />
        <TrustSection />
        <ResourcesSection />
        <FAQAccordion />
        <AppointmentCTA />
      </main>
      <Footer />
      <MobileAppointmentBar />
      <AppointmentModal />
      <RevealObserver />
    </>
  );
}
