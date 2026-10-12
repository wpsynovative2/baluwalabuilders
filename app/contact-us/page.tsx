import type { Metadata } from "next";
import Divider from "@/components/Divider";
import EnquiryForm from "@/components/EnquiryForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import MapEmbed from "@/components/MapEmbed";
import { PageBanner, SectionTitle } from "@/components/PageBanner";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Baluwala Builders – call, email or visit our office in Chakala, Andheri East, Mumbai, or send us an enquiry and we will call you back.",
  alternates: { canonical: "/contact-us" },
};

const infoHeading = "flex items-center gap-3 text-xl text-white";
const infoLink = "block transition-colors hover:text-gold";

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" />
      <SectionTitle title="GET IN TOUCH" />

      <section className="mx-auto mt-8 flex max-w-[1140px] flex-col px-0 md:flex-row md:px-6">
        <div className="relative bg-[url(/images/backgrounds/tall-city-building.jpg)] bg-cover bg-center px-6 py-10 md:w-5/12 md:px-8 lg:bg-fixed">
          <div className="absolute inset-0 bg-white/[0.82]" aria-hidden="true" />
          <div className="relative">
            <div className="text-center text-navy">
              <h2 className="font-display text-[1.75rem] font-medium leading-tight md:text-[2rem]">
                SEND US A MESSAGE
              </h2>
              <Divider variant="floret" className="mx-auto mt-1 max-w-[320px]" />
            </div>
            <div className="mt-6">
              <EnquiryForm source="Contact page" tone="light" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 bg-navy px-6 py-10 text-white md:w-7/12 md:px-10">
          <div>
            <h2 className="font-display text-[1.75rem] font-medium leading-tight md:text-[2rem]">
              Contact Info
            </h2>
            <Divider variant="line-circle" className="mt-1 max-w-[250px]" />
          </div>

          <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-7">
              <div>
                <h3 className={infoHeading}>
                  <PhoneIcon /> CALL US
                </h3>
                <div className="mt-2 flex flex-col gap-1 pl-8 text-lg">
                  {site.phones.map((phone) => (
                    <a key={phone.href} href={phone.href} className={infoLink}>
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={infoHeading}>
                  <MailIcon /> EMAIL
                </h3>
                <div className="mt-2 flex flex-col gap-1 pl-8">
                  {site.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className={`${infoLink} text-[15px] [overflow-wrap:anywhere]`}>
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className={infoHeading}>
                <MapPinIcon /> OUR LOCATION
              </h3>
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${infoLink} mt-2 pl-8 leading-relaxed`}
              >
                {site.address}
              </a>
            </div>
          </div>

          <SocialLinks />
        </div>
      </section>

      <section className="mt-14">
        <div className="mx-auto max-w-[1140px] px-6 text-navy">
          <h2 className="font-display text-[clamp(1.75rem,8vw,3.75rem)] font-medium leading-tight">
            LOCATE US
          </h2>
          <Divider variant="rectangle" className="mt-1 max-w-[330px] text-[#798184]" />
        </div>
        <div className="mt-8">
          <MapEmbed src={site.mapEmbed} title={`${site.name} office on Google Maps`} />
        </div>
      </section>
    </>
  );
}
