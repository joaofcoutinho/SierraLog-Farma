"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { maskPhoneBR } from "@/lib/utils";
import type { ExtraField, LandingContent } from "@/lib/types";

const baseSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("E-mail inválido."),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido.")
    .max(16, "WhatsApp inválido."),
  empresa: z.string().min(2, "Informe a empresa."),
  cargo: z.string().min(2, "Informe seu cargo."),
  consentLgpd: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar os termos." }),
  }),
});

type FormProps = LandingContent["form"];

function buildSchema(extras: ExtraField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of extras) {
    if (f.type === "email") {
      shape[f.name] = z.string().email("E-mail inválido.").optional();
    } else if (f.type === "select" || f.type === "radio") {
      shape[f.name] = z.string().min(1, "Selecione uma opção.");
    } else {
      shape[f.name] = z.string().min(1, "Campo obrigatório.");
    }
  }
  return baseSchema.extend(shape);
}

export function LeadForm({ title, subtitle, extraFields, submitLabel }: FormProps) {
  const router = useRouter();
  const schema = React.useMemo(() => buildSchema(extraFields), [extraFields]);
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { consentLgpd: false as unknown as true },
  });

  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      router.push("/obrigado");
    } catch {
      setServerError(
        "Não foi possível enviar agora. Tente novamente em instantes."
      );
    }
  };

  return (
    <section id="contato" className="bg-brand py-16 md:py-24">
      <Container className="max-w-3xl">
        <div className="rounded-lg bg-white p-6 shadow-xl md:p-10">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base text-neutral-600 md:text-lg">{subtitle}</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid gap-5"
            noValidate
          >
            <Field id="nome" label="Nome completo" error={errors.nome?.message as string | undefined}>
              <Input
                id="nome"
                autoComplete="name"
                aria-invalid={!!errors.nome}
                {...register("nome")}
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field id="empresa" label="Empresa" error={errors.empresa?.message as string | undefined}>
                <Input
                  id="empresa"
                  autoComplete="organization"
                  aria-invalid={!!errors.empresa}
                  {...register("empresa")}
                />
              </Field>
              <Field id="cargo" label="Cargo" error={errors.cargo?.message as string | undefined}>
                <Input
                  id="cargo"
                  autoComplete="organization-title"
                  aria-invalid={!!errors.cargo}
                  {...register("cargo")}
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                id="whatsapp"
                label="WhatsApp"
                error={errors.whatsapp?.message as string | undefined}
              >
                <Input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  aria-invalid={!!errors.whatsapp}
                  {...register("whatsapp")}
                  onChange={(e) => {
                    setValue("whatsapp", maskPhoneBR(e.target.value), {
                      shouldValidate: true,
                    });
                  }}
                />
              </Field>
              <Field
                id="email"
                label="E-mail corporativo"
                error={errors.email?.message as string | undefined}
              >
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </Field>
            </div>

            {extraFields.map((f) => {
              const fieldError = (errors as Record<string, { message?: string }>)[
                f.name
              ]?.message;
              if (f.type === "select") {
                return (
                  <Field
                    key={f.name}
                    id={f.name}
                    label={f.label}
                    error={fieldError}
                  >
                    <Select
                      id={f.name}
                      defaultValue=""
                      aria-invalid={!!fieldError}
                      {...register(f.name as keyof FormValues)}
                    >
                      <option value="" disabled>
                        Selecione uma opção
                      </option>
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Select>
                  </Field>
                );
              }
              if (f.type === "radio") {
                return (
                  <fieldset key={f.name} className="space-y-2">
                    <legend className="text-sm font-semibold text-brand-dark">
                      {f.label}
                    </legend>
                    <div className="flex flex-wrap gap-4">
                      {f.options.map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm text-brand-dark transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-neutral-50 has-[:checked]:text-accent"
                        >
                          <input
                            type="radio"
                            value={opt}
                            className="h-4 w-4 accent-[var(--accent)]"
                            {...register(f.name as keyof FormValues)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {fieldError && (
                      <p className="text-sm text-[color:var(--danger)]">
                        {fieldError}
                      </p>
                    )}
                  </fieldset>
                );
              }
              return (
                <Field key={f.name} id={f.name} label={f.label} error={fieldError}>
                  <Input
                    id={f.name}
                    type={f.type}
                    aria-invalid={!!fieldError}
                    {...register(f.name as keyof FormValues)}
                  />
                </Field>
              );
            })}

            <label className="flex items-start gap-3 text-sm text-neutral-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--accent)]"
                aria-invalid={!!errors.consentLgpd}
                {...register("consentLgpd")}
              />
              <span>
                Concordo em receber contato comercial da Sierralog e com o
                tratamento dos meus dados conforme a LGPD.
              </span>
            </label>
            {errors.consentLgpd && (
              <p className="-mt-3 text-sm text-[color:var(--danger)]">
                {errors.consentLgpd.message as string}
              </p>
            )}

            {serverError && (
              <p
                role="alert"
                className="rounded-md border border-[color:var(--danger)]/30 bg-[color:var(--danger)]/5 px-4 py-3 text-sm text-[color:var(--danger)]"
              >
                {serverError}
              </p>
            )}

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : submitLabel}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
    </div>
  );
}
