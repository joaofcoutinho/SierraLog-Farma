import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { LandingContent } from "@/lib/types";

type ProofProps = LandingContent["proof"];

export function ProofSection({ kpis, locationCaption }: ProofProps) {
  return (
    <section className="bg-brand-dark py-16 text-white md:py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-4 md:gap-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
            >
              <div className="font-display text-4xl font-bold text-accent md:text-5xl">
                {kpi.value}
              </div>
              <div className="mt-2 text-sm text-white/70">{kpi.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-start justify-center gap-3 text-center text-white/80 md:mt-16">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <p className="max-w-2xl text-base leading-relaxed md:text-lg">
            {locationCaption}
          </p>
        </div>
      </Container>
    </section>
  );
}
