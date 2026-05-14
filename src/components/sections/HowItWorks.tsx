import { Container } from "@/components/layout/Container";
import type { LandingContent } from "@/lib/types";

type HowItWorksProps = LandingContent["howItWorks"];

export function HowItWorks({ title, steps }: HowItWorksProps) {
  return (
    <section id="como-funciona" className="bg-white py-16 md:py-24">
      <Container>
        <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">
          {title}
        </h2>

        <ol className="relative mt-12 grid gap-6 md:mt-16 md:grid-cols-4 md:gap-8">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-0.5 bg-neutral-100 md:block"
          />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white shadow-md">
                {i + 1}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
