"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Divider from "./Divider";
import EnquiryForm from "./EnquiryForm";
import { CloseIcon } from "./icons";
import SocialLinks from "./SocialLinks";

type EnquiryContextValue = {
  openEnquiry: (interest?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry(): EnquiryContextValue {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used inside <EnquiryProvider>.");
  return context;
}

const AUTO_OPEN_DELAY_MS = 5000;
const AUTO_OPEN_KEY = "enquiry-popup-seen";

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openEnquiry = useCallback((topic = "") => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setInterest(topic);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus();
  }, []);

  // Greets first-time visitors once per browser session, like the original
  // site's popup, without reappearing on every page.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(AUTO_OPEN_KEY) === "1";
    } catch {}
    if (seen) return;

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(AUTO_OPEN_KEY, "1");
      } catch {}
      setOpen((current) => {
        if (!current) lastFocused.current = document.activeElement as HTMLElement | null;
        return true;
      });
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    try {
      sessionStorage.setItem(AUTO_OPEN_KEY, "1");
    } catch {}

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !dialogRef.current) return;

      // Keep keyboard focus inside the dialog.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex animate-fade-in items-center justify-center overflow-y-auto bg-black/80 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            tabIndex={-1}
            className="relative my-auto flex w-full max-w-[1000px] animate-zoom-in flex-col border-[5px] border-navy bg-navy shadow-[2px_8px_23px_3px_rgba(0,0,0,0.2)] outline-none md:flex-row"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
              className="absolute right-2 top-2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl text-navy transition-colors hover:bg-black/10 md:text-white md:hover:bg-white/15"
            >
              <CloseIcon />
            </button>

            <div className="relative flex min-h-[150px] flex-col items-center justify-center bg-[url(/images/backgrounds/tall-city-building.jpg)] bg-cover bg-center p-6 md:w-2/5">
              <div className="absolute inset-0 bg-white/70" aria-hidden="true" />
              <div className="relative w-full text-center text-navy">
                <h2
                  id="enquiry-modal-title"
                  className="font-display text-[1.75rem] font-medium leading-tight md:text-[2rem]"
                >
                  SEND US A MESSAGE
                </h2>
                <Divider variant="floret" className="mx-auto mt-1 max-w-[320px]" />
                {interest && (
                  <p className="mt-4 text-sm font-semibold">Enquiry for: {interest}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6 md:w-3/5 md:p-8">
              <div className="text-white">
                <h3 className="font-display text-[1.75rem] font-medium leading-tight md:text-[2rem]">
                  Contact Info
                </h3>
                <Divider variant="line-circle" className="mt-1 max-w-[250px]" />
              </div>
              <EnquiryForm source="Popup" interest={interest} tone="dark" />
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
