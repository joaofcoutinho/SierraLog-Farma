import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/db";

const baseShape = {
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string().min(10),
  empresa: z.string().min(2),
  cargo: z.string().optional(),
  mensagem: z.string().optional(),
  consentLgpd: z.literal(true),
};

const schema = z.object(baseShape).passthrough();

const BASE_KEYS = new Set(Object.keys(baseShape));

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const extras: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (!BASE_KEYS.has(k)) extras[k] = v;
  }

  try {
    await insertLead({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      empresa: data.empresa,
      cargo: data.cargo ?? null,
      mensagem: data.mensagem ?? null,
      extras: Object.keys(extras).length ? extras : null,
      consentLgpd: data.consentLgpd,
      persona: process.env.NEXT_PUBLIC_PERSONA ?? null,
    });
  } catch (err) {
    console.error("[LEAD] erro ao persistir", err);
    return NextResponse.json(
      { ok: false, error: "db_error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
