import type { Metadata } from "next";
import { FAQPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about counseling, confidentiality, sessions and appointments.",
};

export default function Page() {
  return <FAQPage />;
}
