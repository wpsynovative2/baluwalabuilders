const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let scriptPromise: Promise<void> | null = null;

// Loads the reCAPTCHA v3 script once, on demand, so it does not slow down
// pages for visitors who never touch a form.
export function loadRecaptcha(): Promise<void> {
  if (!SITE_KEY) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Could not load reCAPTCHA."));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Returns an empty token when no site key is configured (local development);
// the API route decides whether that is acceptable.
export async function getRecaptchaToken(action: string): Promise<string> {
  if (!SITE_KEY) return "";
  await loadRecaptcha();
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) throw new Error("reCAPTCHA is unavailable.");
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(SITE_KEY, { action });
}
