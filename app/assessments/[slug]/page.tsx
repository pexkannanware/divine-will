import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssessmentForm } from "@/components/assessment-form";
import { SiteFrame } from "@/components/interior-pages";
import { assessments } from "@/data/site-data";

export function generateStaticParams() {
  return assessments.map((assessment) => ({ slug: assessment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const assessment = assessments.find((item) => item.slug === slug);
  return {
    title: assessment ? `${assessment.title} Self-Assessment` : "Self-Assessment",
    description: "A private stress, anxiety and depression screening questionnaire with immediate results.",
  };
}

export default async function AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const assessment = assessments.find((item) => item.slug === slug);
  if (!assessment) notFound();

  return (
    <SiteFrame>
      <div className="assessment-page-wrap">
        <div className="mx-auto max-w-site px-5 py-14 lg:px-8 lg:py-20">
          <AssessmentForm selectedAssessment={assessment.title} />
        </div>
      </div>
    </SiteFrame>
  );
}
