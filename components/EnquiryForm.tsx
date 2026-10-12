"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import {
  RECAPTCHA_ACTION,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";
import { site } from "@/lib/site";
import { CheckCircleIcon } from "./icons";
import Spinner from "./Spinner";

type EnquiryFormProps = {
  // Where the form sits on the site; saved to the sheet with each lead.
  source: string;
  interest?: string;
  // "dark" for navy backgrounds, "light" for white ones.
  tone?: "dark" | "light";
  onSuccess?: () => void;
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const emptyValues: EnquiryInput = { name: "", phone: "", email: "" };

export default function EnquiryForm({
  source,
  interest = "",
  tone = "dark",
  onSuccess,
}: EnquiryFormProps) {
  const id = useId();
  const pathname = usePathname();
  const [values, setValues] = useState<EnquiryInput>(emptyValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const submitting = status.state === "submitting";
  const dark = tone === "dark";

  function update(field: keyof EnquiryInput, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const honeypot = new FormData(event.currentTarget).get("company");
    setStatus({ state: "submitting" });
    try {
      const recaptchaToken = await getRecaptchaToken(RECAPTCHA_ACTION);
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypot,
          interest,
          source,
          page: pathname,
          recaptchaToken,
        }),
      });
      const data: { ok?: boolean; error?: string; errors?: EnquiryErrors } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus({
          state: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      setValues(emptyValues);
      setStatus({ state: "success" });
      onSuccess?.();
    } catch {
      setStatus({
        state: "error",
        message: "We could not send your enquiry. Please check your connection and try again.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        role="status"
        className={`flex flex-col items-center gap-3 rounded-md border px-6 py-10 text-center ${
          dark ? "border-white/30 text-white" : "border-navy/20 text-navy"
        }`}
      >
        <CheckCircleIcon className="text-5xl text-gold" />
        <p className="text-lg font-semibold">Thank you for your enquiry!</p>
        <p className="text-sm opacity-80">
          Our team will call you back shortly. For anything urgent, call{" "}
          <a href={site.phones[0].href} className="font-semibold underline">
            {site.phones[0].label}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-2 cursor-pointer text-sm font-semibold underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const labelClass = `mb-1 block text-sm ${dark ? "text-white" : "text-navy"}`;
  const inputClass = (invalid: boolean) =>
    `block w-full rounded-[3px] border bg-white px-3.5 py-2 text-[15px] text-navy placeholder:text-body/60 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-gold/60 disabled:opacity-60 ${
      invalid ? "border-red-500" : dark ? "border-white" : "border-navy/30"
    }`;
  const errorClass = `mt-1 text-xs ${dark ? "text-red-300" : "text-red-600"}`;

  const fields: {
    name: keyof EnquiryInput;
    label: string;
    type: string;
    required: boolean;
    autoComplete: string;
    inputMode?: "tel" | "email";
  }[] = [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
    {
      name: "phone",
      label: "Mobile Number",
      type: "tel",
      required: true,
      autoComplete: "tel",
      inputMode: "tel",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: false,
      autoComplete: "email",
      inputMode: "email",
    },
  ];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      // Fetch the reCAPTCHA script as soon as the visitor shows intent.
      onFocus={() => void loadRecaptcha().catch(() => {})}
      className="flex flex-col gap-2.5"
      aria-busy={submitting}
    >
      {fields.map((field) => {
        const fieldId = `${id}-${field.name}`;
        const error = errors[field.name];
        return (
          <div key={field.name}>
            <label htmlFor={fieldId} className={labelClass}>
              {field.label}
              {field.required ? (
                <span className={dark ? "text-gold" : "text-bronze"} aria-hidden="true">
                  {" "}
                  *
                </span>
              ) : (
                <span className="opacity-60"> (optional)</span>
              )}
            </label>
            <input
              id={fieldId}
              name={field.name}
              type={field.type}
              inputMode={field.inputMode}
              autoComplete={field.autoComplete}
              required={field.required}
              aria-required={field.required}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${fieldId}-error` : undefined}
              disabled={submitting}
              value={values[field.name]}
              onChange={(e) => update(field.name, e.target.value)}
              className={inputClass(Boolean(error))}
            />
            {error && (
              <p id={`${fieldId}-error`} className={errorClass}>
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot – hidden from people, tempting for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1.5 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[3px] bg-gold px-6 py-2.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-navy hover:outline hover:outline-1 hover:outline-white/40 disabled:cursor-wait disabled:opacity-80"
      >
        {submitting ? (
          <>
            <Spinner className="h-5 w-5 border-2" label="Sending" />
            Sending…
          </>
        ) : (
          "Send"
        )}
      </button>

      {status.state === "error" && (
        <p role="alert" className={`text-sm ${dark ? "text-red-300" : "text-red-600"}`}>
          {status.message}
        </p>
      )}

      <p className={`text-[11px] leading-snug ${dark ? "text-white/60" : "text-body"}`}>
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}
