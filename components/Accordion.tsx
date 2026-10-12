"use client";

import { useId, useState, type ReactNode } from "react";
import { MinusIcon, PlusIcon } from "./icons";

type AccordionProps = {
  title: string;
  children: ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between py-2.5 text-left text-sm text-navy"
      >
        {title}
        {open ? <MinusIcon className="text-xs" /> : <PlusIcon className="text-xs" />}
      </button>
      {/* Animates height by transitioning the grid row from 0fr to 1fr. */}
      <div
        id={id}
        role="region"
        aria-label={title}
        className={`grid transition-[grid-template-rows] duration-[400ms] ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className={`overflow-hidden ${open ? "" : "invisible"}`}>{children}</div>
      </div>
    </div>
  );
}
