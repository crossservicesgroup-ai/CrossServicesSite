import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";
import { getService } from "@/content/services";
import { fieldErrors, quoteSchema, type QuoteInput } from "@/lib/quote-schema";

/* ==========================================================================
   Quote form handler.

   Three environment variables are required. Set them in `.env.local` for
   local development and in Vercel under Project → Settings → Environment
   Variables for the live site:

     RESEND_API_KEY    the API key from resend.com
     QUOTE_FROM_EMAIL  the sender, on a domain verified inside Resend.
                       Format: "Display Name <address@yourdomain.com>"
     QUOTE_TO_EMAIL    the inbox that receives new leads. Accepts a single
                       address, or several separated by commas.

   No email address is written into this file. If a variable is missing, or
   Resend refuses the send, the visitor is told plainly that it did not go
   through and is given the phone number. The form never reports success for
   a request that did not actually leave the building.
   ========================================================================== */

/* Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
   Deliberately not a CAPTCHA. On serverless this resets when the instance
   recycles, which is fine — it is a speed bump for bots, not a wall. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

/** Shown to the visitor whenever the office did not get the lead. */
const SEND_FAILED = `We could not send that just now. Call us on ${site.phone.display} and we will take the details over the phone.`;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        error: `That is a few requests in a short space of time. Call us on ${site.phone.display} and we will take the details directly.`,
      },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that submission." }, { status: 400 });
  }

  /* Server-side validation. The same rules ran in the browser, but these are
     the ones that count — a submission that skips the form entirely still has
     to have a name, a well-formed email, a phone, an address and at least one
     service before anything is sent. */
  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some details need fixing before we can send this.",
        errors: fieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  /* Honeypot filled in — a bot. Return success so it does not retry, and
     send nothing. */
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const serviceNames = data.services.map((slug) => getService(slug)?.name ?? slug);
  const submittedAt = timestamp();

  /* Read config at request time rather than module scope, so a corrected
     variable takes effect on the next request. */
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const to = process.env.QUOTE_TO_EMAIL;

  const missing = [
    apiKey ? null : "RESEND_API_KEY",
    from ? null : "QUOTE_FROM_EMAIL",
    to ? null : "QUOTE_TO_EMAIL",
  ].filter(Boolean);

  if (!apiKey || !from || !to) {
    console.error(
      `[quote] NOT SENT — missing environment variable(s): ${missing.join(", ")}. ` +
        "Add them in Vercel (Project → Settings → Environment Variables) and redeploy. " +
        "The lead below never reached the office:\n" +
        internalEmail(data, serviceNames, submittedAt),
    );
    return NextResponse.json({ error: SEND_FAILED }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const recipients = to
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  /* 1. The lead itself. This is the one that decides whether the visitor is
        told it worked. replyTo is the customer, so hitting reply in the CSG
        inbox writes straight back to them. */
  const notification = await send(resend, {
    from,
    to: recipients,
    replyTo: data.email,
    subject: subjectLine(data, serviceNames),
    text: internalEmail(data, serviceNames, submittedAt),
  });

  if (!notification.ok) {
    console.error(
      "[quote] NOT SENT — Resend rejected the notification email.\n" +
        `Resend error: ${describeError(notification.error)}\n` +
        "The lead below never reached the office:\n" +
        internalEmail(data, serviceNames, submittedAt),
    );
    return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
  }

  /* 2. The customer's confirmation. replyTo is the CSG inbox, so if they
        reply it lands with the office rather than the unattended sender.

        A failure here is logged but not shown to the visitor: the office has
        the lead, so their request genuinely did go through. Telling them
        otherwise would send them to the phone for no reason. */
  const confirmation = await send(resend, {
    from,
    to: [data.email],
    replyTo: to,
    subject: `We have your request — ${site.name}`,
    text: customerEmail(data, serviceNames),
  });

  if (!confirmation.ok) {
    console.error(
      "[quote] The lead was delivered, but the customer confirmation to " +
        `${data.email} failed. Resend error: ${describeError(confirmation.error)}`,
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: true,
    confirmationSent: confirmation.ok,
  });
}

/* --------------------------------------------------------------------------
   Sending
   -------------------------------------------------------------------------- */

type EmailPayload = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
};

type SendResult = { ok: true; id: string | null } | { ok: false; error: unknown };

/* The Resend SDK reports a refused send by returning `{ error }` rather than
   throwing, and only throws for transport-level problems. Both count as a
   failure here, so this normalizes them into one result. */
async function send(resend: Resend, payload: EmailPayload): Promise<SendResult> {
  try {
    const { data, error } = await resend.emails.send(payload);
    if (error) return { ok: false, error };
    return { ok: true, id: data?.id ?? null };
  } catch (error) {
    return { ok: false, error };
  }
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}${error.stack ? `\n${error.stack}` : ""}`;
  }
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

/* --------------------------------------------------------------------------
   Email content
   -------------------------------------------------------------------------- */

function timestamp(): string {
  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date());
  return `${formatted} ET`;
}

/** Names the customer and what they asked about, kept short enough to read
    in an inbox list. Extra services are counted rather than listed. */
function subjectLine(data: QuoteInput, serviceNames: string[]): string {
  const [first, ...rest] = serviceNames;
  const services = rest.length > 0 ? `${first} +${rest.length} more` : first;
  return `Quote request: ${services} — ${data.name}, ${data.town}`;
}

function label(text: string): string {
  return `${text}:`.padEnd(16);
}

function internalEmail(
  data: QuoteInput,
  serviceNames: string[],
  submittedAt: string,
): string {
  return [
    "NEW QUOTE REQUEST",
    `Submitted ${submittedAt} via crossservicesgroup.com`,
    "",
    "----------------------------------------------------------------",
    "CONTACT",
    "----------------------------------------------------------------",
    `${label("Name")}${data.name}`,
    `${label("Phone")}${data.phone}`,
    `${label("Email")}${data.email}`,
    "",
    "Reply to this email to answer them directly.",
    "",
    "----------------------------------------------------------------",
    "SERVICES REQUESTED",
    "----------------------------------------------------------------",
    ...serviceNames.map((name) => `  - ${name}`),
    "",
    `${label("Property type")}${data.propertyType === "business" ? "Business" : "Home"}`,
    "",
    "----------------------------------------------------------------",
    "PROPERTY ADDRESS",
    "----------------------------------------------------------------",
    `${label("Street")}${data.street}`,
    `${label("Town")}${data.town}`,
    `${label("State")}MA`,
    `${label("Zip")}${data.zip}`,
    "",
    "----------------------------------------------------------------",
    "MESSAGE",
    "----------------------------------------------------------------",
    data.message?.trim() ? data.message.trim() : "(none given)",
    "",
    "----------------------------------------------------------------",
    "HOW THEY HEARD ABOUT US",
    "----------------------------------------------------------------",
    data.heardAbout?.trim() ? data.heardAbout.trim() : "(not answered)",
    "",
  ].join("\n");
}

function customerEmail(data: QuoteInput, serviceNames: string[]): string {
  return [
    `Hi ${data.name.split(" ")[0]},`,
    "",
    `Thanks for getting in touch with ${site.name}. Your request has reached our office.`,
    "",
    "You asked us about:",
    ...serviceNames.map((name) => `  - ${name}`),
    "",
    "Someone from our team will follow up shortly to confirm the details and get you a quote.",
    "",
    `If you would rather talk it through now, call us on ${site.phone.display}.`,
    "",
    `— ${site.name}`,
    site.address.full,
    site.phone.display,
    "",
  ].join("\n");
}
