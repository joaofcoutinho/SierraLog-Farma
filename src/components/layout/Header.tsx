"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "Dúvidas" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 bg-white shadow-sm"
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex h-16 items-center overflow-hidden md:h-20"
          aria-label="Sierralog — página inicial"
        >
          <Image
            src="/logo-sierralog.png"
            alt="Sierralog"
            width={500}
            height={300}
            priority
            className="h-16 w-auto md:h-24"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-brand-dark transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#contato">Falar com especialista</a>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-dark md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="bg-white shadow-md md:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-brand-dark"
              >
                {item.label}
              </a>
            ))}
            <Button asChild>
              <a href="#contato" onClick={() => setOpen(false)}>
                Falar com especialista
              </a>
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
