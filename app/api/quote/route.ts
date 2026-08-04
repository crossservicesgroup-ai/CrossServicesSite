import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";
import { getService } from "@/content/services";
import { fieldErrors, quoteSchema, type QuoteInput } from "@/lib/quote-schema";

/* ==========================================================================
   Quote form handler.

   [NEEDS INPUT] Two environment variables are required before this can send
   anything. Set them in Vercel (Project → Settings → Environment Variables)
   and in a local .env.local file:

     RESEND_API_KEY   the API key from resend.com
     QUOTE_FROM_EMAIL an address on a domain verified in Resend,
                      e.g. "Cross Services Group <quotes@crossservicesgroup.com>"

   Until those exist the route still validates the submission and returns
   success, but logs the lead to the server console instead of emailing it.
   That keeps the form testable without shipping a broken experience.
   ========================================================================== */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.QUOTE_FROM_EMAIL;

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
  const town = data.town;

  if (!RESEND_API_KEY || !FROM) {
    console.warn(
      "[quote] RESEND_API_KEY or QUOTE_FROM_EMAIL is not set — lead not emailed:",
      JSON.stringify({ ...data, serviceNames, town }, null, 2),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM,
      to: site.email,
      replyTo: data.email,
      subject: `Quote request: ${serviceNames.join(", ")} — ${data.name}, ${town}`,
      text: internalEmail(data, serviceNames, town),
    });

    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "We have your request — Cross Services Group",
      text: customerEmail(data, serviceNames),
    });
  } catch (error) {
    console.error("[quote] Resend failed:", error);
    return NextResponse.json(
      {
        error: `We could not send that just now. Call us on ${site.phone.display} and we will take the details over the phone.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function internalEmail(data: QuoteInput, serviceNames: string[], town: string): string {
  return [
    "New quote request from the website",
    "",
    `Services:    ${serviceNames.join(", ")}`,
    `Property:    ${data.propertyType === "business" ? "Business" : "Home"}`,
    "",
    `Name:        ${data.name}`,
    `Phone:       ${data.phone}`,
    `Email:       ${data.email}`,
    "",
    `Address:     ${data.street}`,
    `             ${town}, MA ${data.zip}`,
    "",
    `Heard about us: ${data.heardAbout || "Not given"}`,
    "",
    "Message:",
    data.message || "(none)",
  ].join("\n");
}

function customerEmail(data: QuoteInput, serviceNames: string[]): string {
  return [
    `Hi ${data.name.split(" ")[0]},`,
    "",
    "Thanks for getting in touch with Cross Services Group. We have your request for:",
    "",
    ...serviceNames.map((name) => `  • ${name}`),
    "",
    "Someone from our office will be in touch to confirm the details and get you a quote covering all of it.",
    "",
    `If you would rather talk it through now, call us on ${site.phone.display}.`,
    "",
    "The Cross Guarantee still applies to everything we do:",
    `"${site.guarantee.quote}"`,
    "",
    "— Cross Services Group",
    `${site.address.full}`,
    `${site.phone.display} · ${site.email}`,
  ].join("\n");
}
