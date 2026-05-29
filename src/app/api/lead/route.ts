import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead, markLeadSyncedToSellbot } from "@/lib/db";
import { sendLeadToSellbot } from "@/lib/sellbot";

const schema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  empresa: z.string().min(2),
  cargo: z.string().min(2),
  tipo_de_produto: z.string().min(1),
  volume_estimado_paletesmes: z.string().min(1),
  exige_temperatura_controlada: z.string().min(1),
  consentLgpd: z.literal(true),
});

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

  let leadId: number;
  try {
    leadId = await insertLead({
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      empresa: data.empresa,
      cargo: data.cargo,
      tipoDeProduto: data.tipo_de_produto,
      volumeEstimadoPaletesMes: data.volume_estimado_paletesmes,
      exigeTemperaturaControlada: data.exige_temperatura_controlada,
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

  // Envia pro Sellbot — não bloqueia o usuário em caso de falha externa,
  // apenas marca o status no DB pra retentativa/auditoria.
  const sellbotResult = await sendLeadToSellbot({
    nome: data.nome,
    email: data.email,
    whatsapp: data.whatsapp,
    empresa: data.empresa,
    cargo: data.cargo,
    tipoDeProduto: data.tipo_de_produto,
    volumeEstimadoPaletesMes: data.volume_estimado_paletesmes,
    exigeTemperaturaControlada: data.exige_temperatura_controlada,
  });

  if (sellbotResult.ok) {
    await markLeadSyncedToSellbot(leadId, true).catch((e) =>
      console.error("[LEAD] erro marcando sync", e)
    );
  } else {
    console.error("[LEAD] Sellbot falhou", sellbotResult);
    await markLeadSyncedToSellbot(leadId, false, sellbotResult.error).catch(
      (e) => console.error("[LEAD] erro marcando erro sync", e)
    );
  }

  return NextResponse.json({ ok: true });
}
