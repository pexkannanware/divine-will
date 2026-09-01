import type { Metadata } from "next";
import { AssessmentsPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "Self-Assessments",
  description: "Private emotional well-being reflection tools for stress, anxiety, burnout and more.",
};

export default function Page() {
  return <AssessmentsPage />;
}
