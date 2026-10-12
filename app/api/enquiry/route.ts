import {
  RECAPTCHA_ACTION,
  normalizePhone,
  validateEnquiry,
} from "@/lib/enquiry";

// Read on every request so a change to the environment applies without a rebuild.
function config() {
  return {
    recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY ?? "",
    recaptchaMinScore: Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5"),
    scriptUrl: process.env.GOOGLE_SCRIPT_URL ?? "",
    scriptSecret: process.env.GOOGLE_SCRIPT_SECRET ?? "",
    isProduction: process.env.NODE_ENV === "production",
  };
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const { recaptchaSecret, recaptchaMinScore, isProduction } = config();
  if (!recaptchaSecret) {
    // Never accept unverified submissions on a live site.
    if (isProduction) throw new Error("RECAPTCHA_SECRET_KEY is not set.");
    console.warn("[enquiry] RECAPTCHA_SECRET_KEY not set – skipping bot check in development.");
    return true;
  }
  if (!token) return false;

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: recaptchaSecret, response: token }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`reCAPTCHA verify failed with ${res.status}`);

  const data: { success?: boolean; score?: number; action?: string } = await res.json();
  return (
    data.success === true &&
    data.action === RECAPTCHA_ACTION &&
    (data.score ?? 0) >= recaptchaMinScore
  );
}

async function saveToSheet(row: Record<string, string>): Promise<void> {
  const { scriptUrl, scriptSecret } = config();
  if (!scriptUrl) throw new Error("GOOGLE_SCRIPT_URL is not set.");

  // Apps Script answers a POST with a redirect to the response body; fetch
  // follows it automatically.
  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...row, secret: scriptSecret }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Google Script responded with ${res.status}`);

  const result: { ok?: boolean; error?: string } = await res.json();
  if (!result.ok) throw new Error(`Google Script error: ${result.error ?? "unknown"}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend it worked.
  if (asString(body.company, 200)) return json({ ok: true });

  const input = {
    name: asString(body.name, 200),
    phone: asString(body.phone, 40),
    email: asString(body.email, 200),
  };
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "Please check the highlighted fields.", errors }, 422);
  }

  try {
    const human = await verifyRecaptcha(asString(body.recaptchaToken, 4000));
    if (!human) {
      return json(
        { ok: false, error: "We could not verify your request. Please try again." },
        403,
      );
    }

    await saveToSheet({
      name: input.name.trim(),
      phone: normalizePhone(input.phone),
      email: input.email.trim(),
      interest: asString(body.interest, 120),
      source: asString(body.source, 60),
      page: asString(body.page, 300),
    });
  } catch (error) {
    console.error("[enquiry]", error);
    return json(
      {
        ok: false,
        error: "Something went wrong on our side. Please call us or try again shortly.",
      },
      502,
    );
  }

  return json({ ok: true });
}
