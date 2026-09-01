import type { Metadata } from "next";
import { ContactPage } from "@/components/interior-pages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Divine Will with a confidential service or support enquiry.",
};

export default function Page() {
  return <ContactPage />;
}
