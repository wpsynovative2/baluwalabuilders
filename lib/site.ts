export const site = {
  name: "Baluwala Builders",
  url: "https://baluwalabuilders.com",
  foundedYear: 1991,
  tagline: "Shaping Milestones Since 1991",
  description:
    "Baluwala Builders is a third-generation real estate developer shaping landmark residential and commercial spaces across Mumbai and Karjat since 1991.",
  phones: [
    { label: "+91 93241 65327", href: "tel:+919324165327" },
    { label: "+91 89287 08090", href: "tel:+918928708090" },
  ],
  emails: ["baluwalabuilders@gmail.com", "sales@baluwalabuilders.com"],
  address:
    "Baluwala, Mahatma Kabir Nagar, Chakala, Bamanwada, Andheri (East), Mumbai, Maharashtra 400099",
  mapLink: "https://maps.app.goo.gl/MubbNXWvEBjRu3WN8",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d280.21196893283474!2d72.86099691699756!3d19.104679456133585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e3!4m0!4m5!1s0x3be7c90075210585%3A0x96ad1bdd4dbbce83!2sBALUWALA%2C%20MAHATAMA%20KABIR%20NAGAR%20CHAKALA%2CANDHERI(E)%2CMUMBAI-400059%2C%20Bamanwada%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.1045958!2d72.86108209999999!5e0!3m2!1sen!2sin!4v1757496125638!5m2!1sen!2sin",
  // Leave a link empty to hide its icon.
  social: {
    whatsapp:
      "https://wa.me/919324165327?text=Hello%20I%20am%20interested%20in%20your%20Project",
    instagram: "",
    linkedin: "",
  },
  credit: { label: "Synovative", href: "https://synovative.in/" },
} as const;

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Projects",
    children: [
      { label: "Upcoming Projects", href: "/upcoming-projects" },
      { label: "Ongoing Project", href: "/ongoing-project" },
      { label: "Completed Projects", href: "/completed-projects" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

export const highlights = [
  "3rd Generation Real Estate Entrepreneurs",
  "Premium, Value-Focused Developments",
  "Projects Across Mumbai & Karjat",
  "Legacy Built on Trust",
];
