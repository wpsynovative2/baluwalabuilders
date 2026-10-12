import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site";
import EnquiryForm from "./EnquiryForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "./icons";

const footerLinks = navItems.flatMap((item) =>
  item.children ? item.children : [{ label: item.label, href: item.href! }],
);

export default function Footer() {
  return (
    <footer className="relative bg-[#0d1226] bg-[url(/images/backgrounds/bg-5632053.jpg)] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-[#313131]/[0.12]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1140px] gap-12 px-6 py-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Image
            src="/images/logo-gold-white-trimmed.png"
            alt={site.name}
            width={758}
            height={826}
            sizes="130px"
            className="h-[140px] w-auto"
          />
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed">
            A name rooted in trust and tradition, shaping landmark residential and commercial
            spaces across Mumbai and Karjat since {site.foundedYear}.
          </p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 shrink-0 text-base text-gold" />
              <span className="flex flex-wrap gap-x-3">
                {site.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="hover:text-gold">
                    {phone.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 shrink-0 text-base text-gold" />
              <a href={`mailto:${site.emails[1]}`} className="[overflow-wrap:anywhere] hover:text-gold">
                {site.emails[1]}
              </a>
            </li>
            <li className="flex items-start gap-3 text-left">
              <MapPinIcon className="mt-0.5 shrink-0 text-base text-gold" />
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                {site.address}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="flex flex-col items-center md:items-start lg:items-center">
          <div>
            <h2 className="font-display text-[2rem] font-medium">Quick Links</h2>
            <ul className="mt-3 flex flex-col items-center md:items-start">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2.5 text-base font-semibold transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-2 lg:col-span-1">
          <h2 className="font-display text-[2rem] font-medium">Contact Us</h2>
          <p className="font-display text-base font-medium">Let’s Connect!</p>
          <div className="mt-5 max-w-md">
            <EnquiryForm source="Footer" tone="dark" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-2 px-6 py-5 text-sm sm:flex-row">
          <p>
            © {site.foundedYear}–2026 {site.name}. All rights reserved.
          </p>
          <p>
            Designed &amp; Developed :{" "}
            <a
              href={site.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:underline"
            >
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
