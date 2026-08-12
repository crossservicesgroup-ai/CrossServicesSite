import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";

/* General inquiry handler for /contact. Uses the same Resend configuration
   as the quote route — see app/api/quote/route.ts for the environment
   variables it needs: RESEND_API_KEY, QUOTE_FROM_EMAIL, QUOTE_TO_EMAIL.

   No email address is written into this file, and the visitor is never told
   a message went through unless Resend accepted it. */

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Enter a 10-digit phone number so we can reach you.",
    }),
  message: z.string().trim().min(5).max(2000),
  /* Spam trap — checked after parsing, not validated here. */
  website: z.string().optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Shown to the visitor whenever the office did not get the message. */
const SEND_FAILED = `We could not send that just now. Call us on ${site.phone.display} and we will take it over the phone.`;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Too many messages in a short space of time. Call ${site.phone.display}.` },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that message." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Some details need fixing." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const submittedAt = timestamp();

  /* Read config at request time so a corrected variable takes effect on the
     next request rather than needing a restart. */
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
      `[contact] NOT SENT — missing environment variable(s): ${missing.join(", ")}. ` +
        "Add them in Vercel (Project → Settings → Environment Variables) and redeploy. " +
        "The message below never reached the office:\n" +
        inquiryEmail(data, submittedAt),
    );
    return NextResponse.json({ error: SEND_FAILED }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const recipients = to
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  /* The Resend SDK reports a refused send by returning `{ error }` rather
     than throwing, and only throws for transport-level problems. Both count
     as a failure, so both are handled. */
  let failure: unknown = null;
  try {
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: data.email,
      subject: `Website inquiry from ${data.name}`,
      text: inquiryEmail(data, submittedAt),
    });
    if (error) failure = error;
  } catch (error) {
    failure = error;
  }

  if (failure) {
    console.error(
      "[contact] NOT SENT — Resend rejected the inquiry email.\n" +
        `Resend error: ${describeError(failure)}\n` +
        "The message below never reached the office:\n" +
        inquiryEmail(data, submittedAt),
    );
    return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
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

function timestamp(): string {
  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date());
  return `${formatted} ET`;
}

function inquiryEmail(data: ContactInput, submittedAt: string): string {
  return [
    "GENERAL INQUIRY FROM THE CONTACT PAGE",
    `Submitted ${submittedAt} via crossservicesgroup.com`,
    "",
    "----------------------------------------------------------------",
    "CONTACT",
    "----------------------------------------------------------------",
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Reply to this email to answer them directly.",
    "",
    "----------------------------------------------------------------",
    "MESSAGE",
    "----------------------------------------------------------------",
    data.message,
    "",
  ].join("\n");
}
