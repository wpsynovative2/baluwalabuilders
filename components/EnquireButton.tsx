"use client";

import type { ReactNode } from "react";
import { useEnquiry } from "./EnquiryModal";

type EnquireButtonProps = {
  children: ReactNode;
  className?: string;
  interest?: string;
};

// Any button that should open the enquiry popup.
export default function EnquireButton({ children, className, interest }: EnquireButtonProps) {
  const { openEnquiry } = useEnquiry();
  return (
    <button type="button" onClick={() => openEnquiry(interest)} className={className}>
      {children}
    </button>
  );
}
