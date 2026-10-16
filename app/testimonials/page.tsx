import type { Metadata } from "next";
import { Video } from "lucide-react";
import { site } from "@/content/site";
import { videoTestimonials, type VideoTestimonial } from "@/content/reviews";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { imageExists } from "@/lib/images";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Reviews } from "@/components/blocks/Reviews";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description: `Hear from Cross Services Group clients across ${site.serviceAreaLabel}. Video and written testimonials from homeowners and property managers.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  /* A local file that has not been uploaded yet is skipped rather than
     rendered as a broken player. */
  const videos = videoTestimonials.filter(
    (v) => v.youtubeId || (v.src && imageExists(v.src)),
  );

  return (
    <>
      <Section tone="paper" labelledBy="video-testimonials-heading">
        <SectionHeader
          id="video-testimonials-heading"
          eyebrow="Testimonials"
          eyebrowClassName="font-display! text-[15px]! font-semibold! normal-case! tracking-normal!"
          title="Hear it from our clients"
        />

        {videos.length > 0 ? (
          /* A single video gets one wider, centred column instead of half
             of an empty two-column grid. */
          <ul
            className={`mt-10 grid grid-cols-1 gap-5 md:mt-14 ${
              videos.length === 1 ? "mx-auto max-w-[880px]" : "md:grid-cols-2"
            }`}
          >
            {videos.map((video, i) => (
              <Reveal as="li" key={`${video.src ?? video.youtubeId}-${i}`} delayIndex={i} className="h-full">
                <VideoCard video={video} />
              </Reveal>
            ))}
          </ul>
        ) : (
          /* [NEEDS INPUT] Add entries to `videoTestimonials` in
             content/reviews.ts and they replace this panel. */
          <div className="mt-10 flex flex-col items-center justify-center gap-2 rounded-[3px] border border-dashed border-line px-5 py-14 text-center md:mt-14">
            <Video aria-hidden="true" className="size-6 text-muted/60" strokeWidth={1.5} />
            <p className="type-eyebrow text-muted">Videos coming soon</p>
            <p className="max-w-[44ch] text-[15px] leading-snug text-muted">
              Client video testimonials will appear here.
            </p>
          </div>
        )}
      </Section>

      <Reviews />
    </>
  );
}

function VideoCard({ video }: { video: VideoTestimonial }) {
  const service = video.serviceSlug ? getService(video.serviceSlug) : undefined;
  const label = video.author
    ? `Video testimonial from ${video.author}`
    : "Client video testimonials";

  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden">
      {video.youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
          title={label}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="block aspect-video w-full border-0 bg-cross-navy"
        />
      ) : (
        <video
          src={video.src}
          poster={video.poster && imageExists(video.poster) ? video.poster : undefined}
          controls
          playsInline
          preload="metadata"
          aria-label={label}
          className="block aspect-video w-full bg-cross-navy"
        />
      )}
      {video.quote || video.author || service ? (
      <div className="flex flex-1 flex-col p-6 md:p-8">
        {video.quote ? (
          <blockquote className="flex-1">
            <p className="font-display text-[19px] leading-[1.45] text-cross-navy md:text-[22px]">
              &ldquo;{video.quote}&rdquo;
            </p>
          </blockquote>
        ) : null}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 ${
            video.quote ? "mt-6 border-t border-line pt-5" : ""
          }`}
        >
          {video.author ? (
            <span className="text-[16px] font-medium">{video.author}</span>
          ) : null}
          {service ? <Tag tone="blue">{service.name}</Tag> : null}
        </div>
      </div>
      ) : null}
    </Card>
  );
}
