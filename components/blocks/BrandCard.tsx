import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getBrand, type Brand } from "@/content/brands";
import { imageExists } from "@/lib/images";

/**
 * "Who does this work" — the portfolio company behind a service.
 *
 * Renders nothing at all when `brandId` is null, so a service Cross handles
 * directly leaves no card and no empty space on the page.
 */
export function BrandCard({
  brandId,
  note,
}: {
  brandId: string | null | undefined;
  /** Extra line, e.g. the Cape Cod note on residential cleaning. */
  note?: string;
}) {
  const brand = getBrand(brandId);
  if (!brand) return null;

  return <BrandPanel brand={brand} note={note} />;
}

function BrandPanel({ brand, note }: { brand: Brand; note?: string }) {
  const hasLogo = imageExists(brand.logo);

  const body = (
    <>
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-line bg-surface md:size-20">
        {hasLogo ? (
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={80}
            height={80}
            className="size-full object-contain p-2"
          />
        ) : (
          /* [NEEDS INPUT] logo file. Initials stand in — never a stock mark. */
          <span className="font-display text-[20px] text-cross-navy">
            {brand.name
              .split(/[\s-]+/)
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="type-eyebrow text-muted">A Cross Services Group company</p>
        <p className="mt-2 flex items-center gap-1.5 text-[19px] font-medium text-cross-navy md:text-[22px]">
          {brand.name}
          {brand.externalUrl ? (
            <ArrowUpRight aria-hidden="true" className="size-4.5 text-cross-blue" />
          ) : null}
        </p>
        <p className="mt-2 max-w-[52ch] text-[16px] text-muted">{brand.blurb}</p>
        {note ? <p className="mt-3 max-w-[52ch] text-[16px]">{note}</p> : null}
        {brand.joinedYear ? (
          <p className="mt-3 text-[15px] text-muted">
            Part of Cross since {brand.joinedYear}.
          </p>
        ) : null}
      </div>
    </>
  );

  const shared = "flex gap-5 rounded-[3px] border border-line bg-paper p-6 md:p-8";

  if (brand.externalUrl) {
    return (
      <a
        href={brand.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shared} card-lift transition-colors hover:border-cross-blue/40`}
      >
        {body}
      </a>
    );
  }

  return <div className={shared}>{body}</div>;
}

/** The quiet logo strip at the bottom of the services index. */
export function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {brands.map((brand) => {
        const hasLogo = imageExists(brand.logo);
        const inner = (
          <>
            {hasLogo ? (
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={120}
                height={48}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="font-display text-[18px] text-cross-navy">{brand.name}</span>
            )}
          </>
        );

        return (
          <li key={brand.id}>
            {brand.externalUrl ? (
              <a
                href={brand.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center rounded-[2px] border border-line bg-surface px-6 transition-colors hover:border-cross-blue/40"
              >
                {inner}
              </a>
            ) : (
              <div className="flex min-h-14 items-center rounded-[2px] border border-line bg-surface px-6">
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
