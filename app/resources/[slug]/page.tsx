import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCTA, SiteFrame } from "@/components/interior-pages";
import { Icon } from "@/components/landing-page";
import { resources } from "@/data/site-data";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) return { title: "Wellness Insight" };
  return {
    title: resource.title,
    description: resource.excerpt,
    openGraph: { images: [{ url: resource.image, alt: resource.imageAlt }] },
  };
}

export default async function ResourceStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();
  const related = resources.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <SiteFrame>
      <article className="story-page">
        <header className="story-header">
          <div className="mx-auto max-w-site px-5 pt-10 lg:px-8 lg:pt-16">
            <Link href="/resources" className="story-back"><span>←</span> Back to all wellness insights</Link>
            <div className="story-heading">
              <p className="eyebrow">{resource.category} <i /> {resource.time}</p>
              <h1>{resource.title}</h1>
              <p>{resource.excerpt}</p>
            </div>
            <div className="story-hero-image">
              <Image src={resource.image} alt={resource.imageAlt} fill priority sizes="(max-width: 1200px) 100vw, 1200px" />
            </div>
          </div>
        </header>
        <div className="story-body mx-auto px-5 lg:px-8">
          <p className="story-intro">{resource.intro}</p>
          {resource.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <aside className="story-takeaway"><span><Icon name="spark" /></span><div><p className="eyebrow">A thought to carry with you</p><strong>{resource.takeaway}</strong></div></aside>
          <div className="story-note"><Icon name="lock" /><p>This article offers general information and reflection, not diagnosis or individual clinical advice. If you are concerned about your well-being, a qualified professional can help.</p></div>
        </div>
        <section className="related-stories">
          <div className="mx-auto max-w-site px-5 lg:px-8">
            <div className="related-heading"><div><p className="eyebrow">Continue reading</p><h2>More wellness insights</h2></div><Link href="/resources" className="text-link">View all insights <Icon name="arrow" /></Link></div>
            <div className="related-grid">
              {related.map((item) => (
                <Link href={`/resources/${item.slug}`} className="related-card" key={item.slug}>
                  <div><Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
                  <span><small>{item.category}</small><strong>{item.title}</strong></span>
                  <Icon name="arrow" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
      <PageCTA title="A useful article can open a door. A conversation can help you walk through it." />
    </SiteFrame>
  );
}
