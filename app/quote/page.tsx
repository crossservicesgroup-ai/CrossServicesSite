import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Section";
import { QuoteForm } from "@/components/blocks/QuoteForm";

export const metadata: Metadata = pageMetadata({
  title: "Get a quote",
  description:
    "Tell us everything your home or building needs in one go. Cross Services Group will come back with a single quote covering all of it.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <Container className="py-12 md:py-20">
      <Suspense fallback={<FormSkeleton />}>
        <QuoteForm />
      </Suspense>
    </Container>
  );
}

/* No h1 here — the form supplies the page's single h1 once it mounts. */
function FormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[680px]" role="status">
      <p className="type-eyebrow text-muted">Loading the quote form…</p>
      <p className="mt-4 text-[17px] text-muted">
        If this does not appear, call us on {site.phone.display} and we will take the
        details over the phone.
      </p>
    </div>
  );
}
