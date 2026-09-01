import type { Metadata } from "next";
import { WorkshopsTrainingPage } from "@/components/workshops-training-page";

export const metadata: Metadata = {
  title: "Workshops & Training",
  description: "Psychology-based workshops and customised training programmes for schools, workplaces and organisations.",
};

export default function Page() {
  return <WorkshopsTrainingPage />;
}
