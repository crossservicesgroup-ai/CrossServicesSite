import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";

/* General inquiry handler for /contact. Uses the same Resend configuration
   as the quote route — see app/api/quote/route.ts for the environment
   variables it needs. */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.QUOTE_FROM_EMAIL;

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
  /* Spam trap — checked after parsing, not validated here. */
  website: z.string().optional(),
});

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

  if (!RESEND_API_KEY || !FROM) {
    console.warn(
      "[contact] RESEND_API_KEY or QUOTE_FROM_EMAIL is not set — message not emailed:",
      JSON.stringify(data, null, 2),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: site.email,
      replyTo: data.email,
      subject: `Website inquiry from ${data.name}`,
      text: [
        "General inquiry from the contact page",
        "",
        `Name:  ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not given"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] Resend failed:", error);
    return NextResponse.json(
      { error: `We could not send that. Call ${site.phone.display}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
