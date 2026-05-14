import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { LandingContent } from "@/lib/types";

type HeroProps = LandingContent["hero"];

export function Hero({
  eyebrow,
  headline,
  sub,
  bullets,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 md:pt-32">
      <Image
        src="/hero-farma.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />

      <Container className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-xl md:p-12">
          <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm font-semibold text-brand">
            {eyebrow}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-brand-dark md:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            {sub}
          </p>
          <ul className="mt-8 inline-flex flex-col items-start gap-3 text-left">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-base text-brand-dark"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-accent"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contato">{ctaPrimary}</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#como-funciona">{ctaSecondary}</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
