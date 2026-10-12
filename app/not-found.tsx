import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-display text-7xl font-semibold text-bronze">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-navy">This page could not be found</h1>
      <p className="mt-3 max-w-md">
        The page you are looking for may have been moved. Let us take you back to our projects.
      </p>
      <Link
        href="/"
        className="mt-8 border border-navy bg-navy px-7 py-3 font-medium text-white transition-colors duration-300 hover:bg-white hover:text-navy"
      >
        Back to Home
      </Link>
    </section>
  );
}
