import type { Metadata } from "next";
import { ResourcesPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "Wellness Insights",
  description: "Compassionate, practical guidance for emotional health, relationships, parenting and work.",
};

export default function Page() {
  return <ResourcesPage />;
}
