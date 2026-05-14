import {
  ShieldCheck,
  Thermometer,
  FileSearch,
  Warehouse,
  Truck,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { LandingContent } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Thermometer,
  FileSearch,
  Warehouse,
  Truck,
  ClipboardCheck,
};

type BenefitsProps = LandingContent["benefits"];

export function BenefitsGrid({ title, subtitle, items }: BenefitsProps) {
  return (
    <section id="beneficios" className="bg-neutral-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <Card key={item.title}>
                <div
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-50 text-accent"
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <CardTitle className="mt-5">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
