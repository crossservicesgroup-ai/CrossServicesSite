"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Field, TextArea, TextInput } from "@/components/ui/Field";

/* --------------------------------------------------------------------------
   A short general inquiry form for people who are not requesting a quote.
   It does not duplicate the quote flow — anyone who wants pricing is sent
   to /quote instead.

   It posts to the same handler as the quote form so there is one inbox and
   one place to configure Resend. The submission is tagged as a general
   inquiry via the message body.
   -------------------------------------------------------------------------- */

type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "form", string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter an email address we can reply to.";
    if (phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a 10-digit phone number so we can reach you.";
    if (message.trim().length < 5) next.message = "Tell us what you need, in a line or two.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, website }),
      });
      if (!response.ok) {
        setErrors({
          form: `That did not send. Call us on ${site.phone.display} and we will pick it up straight away.`,
        });
        setSending(false);
        return;
      }
      setSent(true);
    } catch {
      setErrors({
        form: `We could not reach the server. Try again, or call ${site.phone.display}.`,
      });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-[3px] border border-cross-blue/25 bg-cross-blue/6 p-6 md:p-8"
      >
        <p className="text-[17px]">
          Thanks {name.split(" ")[0]} — your message is with the office and someone will
          reply to {email}.
        </p>
        <p className="mt-3 text-[16px] text-muted">
          If it is urgent, call{" "}
          <a
            href={site.phone.href}
            className="font-medium text-cross-blue underline underline-offset-4"
          >
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <Field id="contact-name" label="Your name" error={errors.name} required>
        <TextInput
          id="contact-name"
          name="name"
          value={name}
          onChange={setName}
          autoComplete="name"
          error={errors.name}
          required
        />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email} required>
        <TextInput
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          inputMode="email"
          autoComplete="email"
          error={errors.email}
          required
        />
      </Field>

      <Field id="contact-phone" label="Phone" error={errors.phone} required>
        <TextInput
          id="contact-phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={setPhone}
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone}
          required
        />
      </Field>

      <Field id="contact-message" label="How can we help?" error={errors.message} required>
        <TextArea
          id="contact-message"
          name="message"
          value={message}
          onChange={setMessage}
          rows={5}
          error={errors.message}
          required
        />
      </Field>

      {errors.form ? (
        <p role="alert" className="text-[16px] text-cross-blue">
          {errors.form}
        </p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
