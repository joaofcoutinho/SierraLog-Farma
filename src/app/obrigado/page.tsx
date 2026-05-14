import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Obrigado | Sierralog",
  description:
    "Recebemos seu contato. Nosso time comercial responderá em até 24h.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 py-24">
        <Container className="max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <CheckCircle2 className="h-10 w-10" strokeWidth={1.75} aria-hidden />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold leading-tight tracking-tight text-brand-dark md:text-5xl">
            Recebemos sua solicitação.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
            Nosso time comercial responderá em até 24h com uma proposta para sua
            operação farma.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">Voltar para o início</Link>
            </Button>
            <Button asChild variant="secondary">
              <a
                href="https://sellers.sierralog.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer outras soluções
              </a>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
