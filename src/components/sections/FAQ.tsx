import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LandingContent } from "@/lib/types";

type FAQProps = LandingContent["faq"];

export function FAQ({ title, items }: FAQProps) {
  return (
    <section id="faq" className="bg-neutral-50 py-16 md:py-24">
      <Container className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">
          {title}
        </h2>

        <Accordion type="single" collapsible className="mt-10">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((it) => ({
                "@type": "Question",
                name: it.q,
                acceptedAnswer: { "@type": "Answer", text: it.a },
              })),
            }),
          }}
        />
      </Container>
    </section>
  );
}
