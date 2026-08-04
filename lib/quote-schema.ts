/* ==========================================================================
   Quote form validation. The same rules run in the browser and again on the
   server, so nothing gets through by disabling JavaScript.
   ========================================================================== */

import { z } from "zod";
import { serviceSlugs } from "@/content/services";

export const quoteSchema = z.object({
  services: z
    .array(z.string())
    .min(1, "Pick at least one service. You can pick as many as you need.")
    .refine((values) => values.every((v) => serviceSlugs.includes(v)), {
      message: "One of those services was not recognized. Please choose again.",
    }),

  propertyType: z.enum(["home", "business"], {
    message: "Let us know whether this is for a home or a business.",
  }),

  street: z.string().trim().min(3, "Enter the street address."),
  town: z.string().trim().min(2, "Enter your town."),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Enter a 5-digit zip code."),

  name: z.string().trim().min(2, "Enter your name."),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Enter a 10-digit phone number so we can reach you.",
    }),
  email: z.string().trim().email("Enter an email address we can reply to."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  heardAbout: z.string().trim().max(200).optional().or(z.literal("")),

  /* Spam trap. Real people never see this field, so it stays empty for them.
     It is deliberately not validated here — the server checks it after
     parsing and answers a bot with a plain success, so it does not retry. */
  website: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const HEARD_ABOUT_OPTIONS = [
  "Google search",
  "A friend or neighbor",
  "We already use Cross for something else",
  "Saw a Cross truck",
  "Cross Courts",
  "Social media",
  "Other",
];

/** Field-by-field errors keyed by field name, ready for inline display. */
export function fieldErrors(error: z.ZodError<QuoteInput>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
