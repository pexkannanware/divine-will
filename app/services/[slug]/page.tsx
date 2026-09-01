import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorHero, PageCTA, SiteFrame } from "@/components/interior-pages";
import { Icon } from "@/components/landing-page";
import { services } from "@/data/site-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service
    ? { title: service.title, description: service.intro, openGraph: { images: [{ url: service.image, alt: service.imageAlt }] } }
    : { title: "Counseling Service" };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <SiteFrame>
      <InteriorHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        accent="with care."
        description={service.intro}
      />
      <section className="service-detail-section">
        <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="service-detail-image reveal">
            <Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" />
            <span><Icon name={service.icon} className="h-7 w-7" /></span>
          </div>
          <div className="service-detail-copy reveal">
            <p className="eyebrow">How we can help</p>
            <h2>Support for what feels difficult now</h2>
            <div className="service-help-list">
              {service.helpsWith.map((item) => <p key={item}><Icon name="check" />{item}</p>)}
            </div>
            <div className="service-approach"><p className="eyebrow">Our approach</p><p>{service.approach}</p></div>
            <div className="service-detail-actions">
              <Link href="/contact" className="button-primary">Contact us <Icon name="arrow" /></Link>
              <Link href="/services" className="button-secondary">All services</Link>
            </div>
          </div>
        </div>
      </section>
      <PageCTA title={`Ready to ask about ${service.title.toLowerCase()}?`} />
    </SiteFrame>
  );
}
