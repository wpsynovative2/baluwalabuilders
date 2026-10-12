# Baluwala Builders – website

Next.js (App Router) + TypeScript + Tailwind CSS rebuild of [baluwalabuilders.com](https://baluwalabuilders.com/).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Where things live

| What | Where |
| --- | --- |
| Phone numbers, emails, address, map, social links, menu | `lib/site.ts` |
| Projects (upcoming / ongoing / completed) | `lib/projects.ts` |
| Pages | `app/` |
| Reusable UI (header, footer, slider, forms, popup, …) | `components/` |
| Enquiry form API (reCAPTCHA check + Google Sheet) | `app/api/enquiry/route.ts` |
| Google Apps Script for the sheet | `google-apps-script/Code.gs` |
| Images, fonts, dividers | `public/` |

To add or edit a project, change `lib/projects.ts` – every page picks it up automatically.
To show the Instagram / LinkedIn icons, fill in their URLs in `lib/site.ts`.

## Enquiry forms

All three forms (popup, footer, contact page) post to `/api/enquiry`, which:

1. validates the fields – **name and mobile number are required**, email is optional;
2. verifies the reCAPTCHA v3 token with Google and rejects low scores;
3. forwards the lead to a Google Apps Script web app, which appends a row to a Google Sheet.

The keys and the script URL stay on the server. Copy `.env.example` to `.env.local` and fill it in:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SCRIPT_SECRET=a-long-random-string
```

Set the same four variables in your hosting provider (e.g. Vercel → Project → Settings → Environment Variables).

### reCAPTCHA v3 setup

1. Open <https://www.google.com/recaptcha/admin/create>.
2. Choose **Score based (v3)** and add your domains (`baluwalabuilders.com`, and `localhost` for testing).
3. Copy the **site key** into `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and the **secret key** into `RECAPTCHA_SECRET_KEY`.

Without a secret key the bot check is skipped in `npm run dev` only; a production build refuses submissions until the key is set.

### Google Sheet setup

1. Create a Google Sheet for the leads.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste in `google-apps-script/Code.gs`.
3. Change `SHARED_SECRET` at the top of the script to a long random string, and put the same string in `GOOGLE_SCRIPT_SECRET`.
4. **Deploy → New deployment → Web app**. Set *Execute as* **Me** and *Who has access* **Anyone**, then authorise it.
5. Copy the web app URL (ends in `/exec`) into `GOOGLE_SCRIPT_URL`.

Leads land in a tab called **Enquiries** with these columns: Timestamp (IST), Name, Mobile Number, Email, Interested In, Form, Page.

Each lead is also emailed to the address in `NOTIFY_EMAIL` at the top of the script (default `sales@baluwalabuilders.com`). This uses Google's free mail quota: about 100 emails a day on a personal Gmail account, 1,500 on Google Workspace.

If you edit the script later, publish it with **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Notes

- The Aviara brochure is ~100 MB, so it is linked from its hosted URL rather than committed. A local copy in `public/brochures/` is ignored by git.
- The enquiry popup opens automatically 5 seconds after a visitor's first page view, once per browser session.
