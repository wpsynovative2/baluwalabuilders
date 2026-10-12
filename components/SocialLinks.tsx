import { site } from "@/lib/site";
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from "./icons";

const links = [
  { label: "WhatsApp", href: site.social.whatsapp, Icon: WhatsappIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
].filter((link) => link.href);

export default function SocialLinks() {
  return (
    <div>
      <p className="text-xl text-white">FOLLOW US</p>
      <ul className="mt-3 flex gap-2">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-navy transition-colors duration-300 hover:bg-gold hover:text-white"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
