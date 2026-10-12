export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const RECAPTCHA_ACTION = "enquiry";

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-().]/g, "");
}

// Shared by the form and the API route so both enforce the same rules.
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = input.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name is too short.";
  else if (name.length > 80) errors.name = "Name is too long.";

  const phone = normalizePhone(input.phone);
  if (!phone) errors.phone = "Please enter your mobile number.";
  else if (!/^\+?\d{10,15}$/.test(phone))
    errors.phone = "Enter a valid mobile number (10–15 digits).";

  const email = input.email.trim();
  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)))
    errors.email = "Enter a valid email address.";

  return errors;
}
