import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { EnquiryProvider } from "@/components/EnquiryModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const afterglow = localFont({
  src: "../public/fonts/Afterglow-Regular.ttf",
  variable: "--font-afterglow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Real Estate Developers in Mumbai Since ${site.foundedYear}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Baluwala Builders",
    "real estate developer Mumbai",
    "flats in Andheri East",
    "1 & 2 BHK Andheri",
    "Aviara Andheri",
    "builders in Mumbai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_IN",
    images: [{ url: "/images/slider/slide-2.png", width: 1600, height: 979 }],
  },
  icons: {
    icon: [{ url: "/images/logo-gold-blue-300.png", sizes: "192x192", type: "image/png" }],
    apple: "/images/logo-gold-blue-300.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a354e",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/logo-gold-blue.png`,
  foundingDate: String(site.foundedYear),
  description: site.description,
  telephone: site.phones.map((phone) => phone.href.replace("tel:", "")),
  email: site.emails[1],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mahatma Kabir Nagar, Chakala, Bamanwada, Andheri (East)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400099",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${afterglow.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[300] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <EnquiryProvider>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </EnquiryProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
