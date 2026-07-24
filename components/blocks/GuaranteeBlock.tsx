import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { CheckGlyph } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The Cross Guarantee. Wording is copied verbatim from the current site and
 * lives in content/site.ts. Do not rewrite it.
 *
 * `size="large"` is the homepage treatment — full bleed navy, the emotional
 * centre of the page. `size="small"` is the quieter About page version.
 */
export function GuaranteeBlock({ size = "large" }: { size?: "large" | "small" }) {
  const { quote, attribution, attributionTitle } = site.guarantee;

  if (size === "small") {
    return (
      <div className="rounded-[3px] border border-line bg-surface p-8 md:p-12">
        <p className="type-eyebrow mb-5 flex items-center gap-2 text-cross-blue">
          <CheckGlyph />
          The Cross Guarantee
        </p>
        <blockquote>
          <p className="font-display text-[24px] leading-[1.3] text-cross-navy md:text-[30px]">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="mt-5 text-[15px] text-muted">
            <span className="font-medium text-ink">{attribution}</span>, {attributionTitle}
          </footer>
        </blockquote>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="guarantee-heading"
      className="on-navy relative isolate overflow-hidden bg-cross-navy py-20 text-white md:py-28 lg:py-36"
    >
      {/* A faint job-ticket rule, so the slab is not a flat void */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 40px)",
        }}
      />
      <Container className="relative">
        {/* Width is set in px, not ch — the quote renders in Newsreader at up
            to 52px, while `ch` would measure against the inherited sans. */}
        <Reveal className="mx-auto max-w-[560px] text-center lg:max-w-[900px]">
          <p className="type-eyebrow mb-8 inline-flex items-center gap-2 text-white/70">
            <CheckGlyph className="text-white/70" />
            The Cross Guarantee
          </p>
          <h2
            id="guarantee-heading"
            className="font-display text-[28px] leading-[1.22] text-white md:text-[42px] lg:text-[52px]"
          >
            &ldquo;{quote}&rdquo;
          </h2>
          <p className="mt-8 text-[16px] text-white/70">
            <span className="font-medium text-white">{attribution}</span>
            <span className="mx-2 text-white/40">·</span>
            {attributionTitle}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
