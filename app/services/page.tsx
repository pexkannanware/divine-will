import type { Metadata } from "next";
import { ServicesPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "Counseling Services",
  description: "Explore counseling services for students, teenagers, individuals, couples, families and workplaces.",
};

export default function Page() {
  return <ServicesPage />;
}
