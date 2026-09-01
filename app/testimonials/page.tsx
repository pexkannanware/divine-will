import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read client reflections about counselling and emotional well-being support from The Divine Will.",
};

export default function Page() {
  return <TestimonialsPage />;
}
