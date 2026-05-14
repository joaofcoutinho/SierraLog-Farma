import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Sierralog"
            >
              <Image
                src="/logo-sierralog.png"
                alt="Sierralog"
                width={500}
                height={300}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Operadora logística em Extrema/MG. Armazenagem, fulfillment e
              distribuição com compliance para os setores que atendemos.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/60">
              Soluções
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://sellers.sierralog.com.br"
                  className="text-white/90 transition-colors hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sellers e-commerce
                </a>
              </li>
              <li>
                <a
                  href="https://importadores.sierralog.com.br"
                  className="text-white/90 transition-colors hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Importadores
                </a>
              </li>
              <li>
                <a
                  href="https://farma.sierralog.com.br"
                  className="text-white/90 transition-colors hover:text-accent"
                >
                  Farma e saúde
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/60">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="text-white/90">Extrema, MG — Brasil</li>
              <li>
                <a
                  href="mailto:comercial@sierralog.com.br"
                  className="text-white/90 transition-colors hover:text-accent"
                >
                  comercial@sierralog.com.br
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white/90 transition-colors hover:text-accent"
                >
                  Solicitar proposta
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/60">
              Institucional
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/90 transition-colors hover:text-accent"
                >
                  Política de privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 transition-colors hover:text-accent"
                >
                  Termos de uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 transition-colors hover:text-accent"
                >
                  LGPD
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60">
          © {year} Sierralog. Todos os direitos reservados.
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Sierralog",
            description:
              "Operadora logística com compliance para o setor farmacêutico em Extrema/MG.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Extrema",
              addressRegion: "MG",
              addressCountry: "BR",
            },
            email: "comercial@sierralog.com.br",
            url: "https://farma.sierralog.com.br",
          }),
        }}
      />
    </footer>
  );
}
