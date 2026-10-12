export type ProjectStatus = "upcoming" | "ongoing" | "completed";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  image: { src: string; alt: string };
  facts: { label: string; value: string }[];
  // Shown as an "Enquire" action instead of a plain value.
  priceOnRequest?: boolean;
  amenities?: string[];
  brochureUrl?: string;
  websiteUrl?: string;
};

const placeholderImage = "/images/projects/placeholder-building.png";

export const projects: Project[] = [
  {
    slug: "aviara",
    name: "Aviara",
    status: "ongoing",
    tagline: "For homes that speak your style",
    description:
      "Explore Andheri’s best-kept secret, an exquisite symphony of luxury that elevates your living experience, offering an amazing lifestyle perfect for vibrant and opulent living.",
    image: {
      src: "/images/projects/aviara-thumb.png",
      alt: "Aviara by Baluwala – residential tower on Sahar Road, Andheri East",
    },
    facts: [
      { label: "RERA Registration Number", value: "P99000019569" },
      { label: "Location", value: "Sahar Road, Andheri East" },
      { label: "Configuration", value: "1 & 2 BHK" },
    ],
    priceOnRequest: true,
    amenities: [
      "G+16 storied commercial and residential building",
      "Approved project",
      "Home loan assistance available",
      "Earthquake-resistant structure",
      "Decorative entrance with M.S. gate",
      "24 x 7 security",
      "CCTV cameras for entrance and common areas",
      "Intercom system",
      "Fire-fighting system",
      "High-speed branded lifts",
      "Inverter backup for lifts and common areas",
      "Stilt / open parking",
    ],
    brochureUrl:
      "https://codewordlivehigh.com/wp-content/uploads/2025/08/Aviara-Brochure-1.pdf",
    websiteUrl: "https://codewordlivehigh.com/",
  },
  {
    slug: "upcoming-project-01",
    name: "Project 01",
    status: "upcoming",
    tagline: "For homes that speak your style",
    description:
      "Explore Andheri’s best-kept secret, an exquisite symphony of luxury that elevates your living experience, offering an amazing lifestyle perfect for vibrant and opulent living.",
    image: { src: placeholderImage, alt: "Artist’s impression of an upcoming Baluwala Builders residence" },
    facts: [
      { label: "Status", value: "Launching Soon" },
      { label: "Location", value: "Andheri" },
      { label: "Configuration", value: "1 & 2 BHK" },
    ],
    priceOnRequest: true,
  },
  {
    slug: "upcoming-project-02",
    name: "Project 02",
    status: "upcoming",
    tagline: "For homes that speak your style",
    description:
      "Explore Andheri’s best-kept secret, an exquisite symphony of luxury that elevates your living experience, offering an amazing lifestyle perfect for vibrant and opulent living.",
    image: { src: placeholderImage, alt: "Artist’s impression of an upcoming Baluwala Builders residence" },
    facts: [
      { label: "Status", value: "Launching Soon" },
      { label: "Location", value: "Andheri" },
      { label: "Configuration", value: "1 & 2 BHK" },
    ],
    priceOnRequest: true,
  },
  {
    slug: "blue-diamond",
    name: "Blue Diamond",
    status: "completed",
    tagline: "For homes that speak your style",
    description:
      "The present firm had constructed Building name Blue Diamond Wings A, B, C at Dahisar, which were completed in the year 1992–93, admeasuring an area of around 80,000 Sq Ft.",
    image: { src: placeholderImage, alt: "Blue Diamond, Dahisar" },
    facts: [
      { label: "Location", value: "Anand Nagar, Dahisar" },
      { label: "Completed", value: "1992–93" },
      { label: "Built-up Area", value: "Approx. 80,000 Sq Ft" },
      { label: "Type", value: "Residential – Wings A, B & C" },
    ],
  },
  {
    slug: "sahar-classique",
    name: "Sahar Classique",
    status: "completed",
    tagline: "For homes that speak your style",
    description:
      "The Building called as Sahar Classique was completed in 2002. The total area constructed is around 50,000 Sq Ft. Part of this Building was let out by the Firm.",
    image: {
      src: "/images/projects/sahar-classique-thumb.jpeg",
      alt: "Sahar Classique, Sahar Road, Andheri East",
    },
    facts: [
      { label: "Location", value: "Sahar Road, Andheri East" },
      { label: "Completed", value: "2002" },
      { label: "Built-up Area", value: "Approx. 50,000 Sq Ft" },
    ],
  },
  {
    slug: "72-empire",
    name: "72 Empire",
    status: "completed",
    tagline: "A landmark business address",
    description:
      "The Building situated at the prime corner of Andheri Kurla Road and Western Express Highway and is one of the Landmark Buildings in the area. The Total Construction area is approximately 60,000 Sq Ft. The Building was constructed under the guidance of the partners of Baluwala Builders. 50% of the area belongs to the partners of Baluwala Builders and their relatives. The property is leased out to well-known listed firms, companies, NBFCs, etc., like Axis Bank Ltd, LIC Housing Finance Ltd, Rustomjee Group.",
    image: {
      src: "/images/projects/72-empire-thumb.jpeg",
      alt: "72 Empire, Andheri East",
    },
    facts: [
      { label: "Location", value: "Andheri East" },
      { label: "Built-up Area", value: "Approx. 60,000 Sq Ft" },
      { label: "Type", value: "Commercial" },
    ],
  },
  {
    slug: "bungalow-karjat",
    name: "Bungalow – Karjat",
    status: "completed",
    tagline: "A private retreat in the hills",
    description:
      "Bungalow was constructed at a 7-acre plot at Karjat in the year 2022 by the partners of Baluwala Builders, and presently it is leased out to a hospitality Company.",
    image: {
      src: "/images/projects/karjat-villa-thumb.jpeg",
      alt: "Bungalow at Karjat",
    },
    facts: [
      { label: "Location", value: "Karjat" },
      { label: "Completed", value: "2022" },
      { label: "Plot Area", value: "7 Acres" },
    ],
  },
  {
    slug: "vrindavan",
    name: "Vrindavan",
    status: "completed",
    tagline: "For homes that speak your style",
    description:
      "The partners of the firm had constructed Building name Vrindavan, Azad Road, Vile Parle East, which was completed in the year 2005–06, and measuring an area of around 15,000 Sq Ft.",
    image: { src: placeholderImage, alt: "Vrindavan, Vile Parle East" },
    facts: [
      { label: "Location", value: "Azad Road, Vile Parle East" },
      { label: "Completed", value: "2005–06" },
      { label: "Built-up Area", value: "Approx. 15,000 Sq Ft" },
    ],
  },
];

export function projectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((p) => p.status === status);
}
