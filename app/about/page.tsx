import type { Metadata } from "next";
import { AboutPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about The Divine Will and our compassionate approach to emotional well-being.",
};

export default function Page() {
  return <AboutPage />;
}
