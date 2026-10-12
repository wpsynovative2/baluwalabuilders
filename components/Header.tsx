"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/lib/site";
import EnquireButton from "./EnquireButton";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";

const linkBase =
  "relative block px-4 py-3 text-[15px] font-semibold uppercase tracking-wide transition-colors duration-300 hover:text-gold";
// Underline that grows in on hover, as on the original menu.
const underline =
  "after:absolute after:inset-x-4 after:bottom-1.5 after:h-[3px] after:origin-center after:scale-x-0 after:bg-navy after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setProjectsOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-[100] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
        <Link href="/" aria-label={`${site.name} – home`} onClick={closeMenu} className="shrink-0">
          <Image
            src="/images/logo-gold-blue-trimmed.png"
            alt={site.name}
            width={758}
            height={827}
            sizes="70px"
            preload
            className="h-[60px] w-auto lg:h-[68px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center text-navy">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    className={`${linkBase} ${underline} flex cursor-pointer items-center gap-1.5 ${
                      item.children.some((c) => isActive(c.href)) ? "text-gold" : ""
                    }`}
                  >
                    {item.label}
                    <ChevronDownIcon className="text-sm transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <ul className="invisible absolute left-0 top-full min-w-[230px] translate-y-1 bg-white py-1 opacity-0 shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          className={`block px-5 py-3 text-[13px] font-medium uppercase transition-colors hover:bg-navy hover:text-white ${
                            isActive(child.href) ? "text-gold" : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    aria-current={isActive(item.href!) ? "page" : undefined}
                    className={`${linkBase} ${underline} ${
                      isActive(item.href!) ? "text-gold after:scale-x-100" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <EnquireButton className="cursor-pointer whitespace-nowrap border border-navy bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-navy sm:px-7 sm:py-3 sm:text-[15px]">
            Enquire Now
          </EnquireButton>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-[28px] text-navy lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-72px)] animate-fade-in overflow-y-auto border-t border-navy/10 bg-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] lg:hidden"
        >
          <ul className="py-2 text-navy">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={projectsOpen}
                    onClick={() => setProjectsOpen((v) => !v)}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-3.5 text-[15px] font-semibold uppercase"
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`transition-transform duration-300 ${projectsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {projectsOpen && (
                    <ul className="bg-navy/5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className={`block px-10 py-3 text-sm font-medium uppercase ${
                              isActive(child.href) ? "text-bronze" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    onClick={closeMenu}
                    aria-current={isActive(item.href!) ? "page" : undefined}
                    className={`block px-6 py-3.5 text-[15px] font-semibold uppercase ${
                      isActive(item.href!) ? "text-bronze" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
