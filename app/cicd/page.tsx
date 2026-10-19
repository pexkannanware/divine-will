import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CI/CD Deployment Check",
  robots: { index: false, follow: false },
};

export default function CicdPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
        The Divine Will
      </p>
      <h1 className="text-4xl font-bold">CI/CD Deployment Check</h1>
      <p className="text-lg leading-relaxed">
        Hello from the deployment pipeline! This dummy page was added to verify
        that a push to main builds the website in GitHub Actions and deploys it
        automatically to our DigitalOcean Droplet.
      </p>
      <p className="leading-relaxed">
        If you can see this page on the live website, the CI/CD test is complete.
      </p>
      <Link href="/" className="font-semibold text-teal-700 underline">
        Back to home
      </Link>
    </main>
  );
}
