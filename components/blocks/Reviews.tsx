import { Star } from "lucide-react";
import { site } from "@/content/site";
import { reviews } from "@/content/reviews";
import { getService } from "@/content/services";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <Section tone="surface" labelledBy="reviews-heading">
      <SectionHeader
        id="reviews-heading"
        eyebrow="What clients say"
        title="Thirty-plus years of repeat business and referrals"
      />

      <ul className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2">
        {reviews.map((review, i) => {
          const service = review.serviceSlug ? getService(review.serviceSlug) : undefined;
          return (
            <Reveal as="li" key={review.author + i} delayIndex={i} className="h-full">
              <Card as="article" className="flex h-full flex-col p-6 md:p-8">
                {review.rating ? <Stars rating={review.rating} /> : null}
                <blockquote className="mt-4 flex-1">
                  <p className="font-display text-[19px] leading-[1.45] text-cross-navy md:text-[22px]">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                  <span className="text-[16px] font-medium">{review.author}</span>
                  {service ? <Tag tone="blue">{service.name}</Tag> : null}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      <p className="mt-8 text-[16px]">
        <a
          href={site.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cross-blue underline-offset-4 hover:underline"
        >
          Read more reviews on Google →
        </a>
      </p>
    </Section>
  );
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    /* The number is stated in text as well as drawn, so the rating is never
       conveyed by shape or colour alone. */
    <p className="flex items-center gap-1.5">
      <span aria-hidden="true" className="flex gap-0.5 text-cross-blue">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className="size-4"
            fill={i < rounded ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="text-[14px] font-medium text-muted">{rating} out of 5</span>
    </p>
  );
}
