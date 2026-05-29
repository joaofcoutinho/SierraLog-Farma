import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não configurada.");
}

export const sql = neon(connectionString);

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          email TEXT NOT NULL,
          telefone TEXT,
          empresa TEXT NOT NULL,
          cargo TEXT,
          mensagem TEXT,
          extras JSONB,
          consent_lgpd BOOLEAN NOT NULL DEFAULT FALSE,
          persona TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS whatsapp TEXT`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS tipo_de_produto TEXT`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS volume_estimado_paletesmes TEXT`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS exige_temperatura_controlada TEXT`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS sellbot_synced BOOLEAN NOT NULL DEFAULT FALSE`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS sellbot_synced_at TIMESTAMPTZ`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS sellbot_error TEXT`;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

export type LeadRow = {
  id: number;
  nome: string;
  email: string;
  whatsapp: string | null;
  telefone: string | null;
  empresa: string;
  cargo: string | null;
  tipo_de_produto: string | null;
  volume_estimado_paletesmes: string | null;
  exige_temperatura_controlada: string | null;
  mensagem: string | null;
  extras: Record<string, unknown> | null;
  consent_lgpd: boolean;
  persona: string | null;
  sellbot_synced: boolean;
  sellbot_synced_at: string | null;
  sellbot_error: string | null;
  created_at: string;
};

export async function insertLead(input: {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  cargo: string;
  tipoDeProduto: string;
  volumeEstimadoPaletesMes: string;
  exigeTemperaturaControlada: string;
  consentLgpd: boolean;
  persona?: string | null;
}): Promise<number> {
  await ensureSchema();
  const rows = await sql`
    INSERT INTO leads (
      nome, email, whatsapp, telefone, empresa, cargo,
      tipo_de_produto, volume_estimado_paletesmes, exige_temperatura_controlada,
      consent_lgpd, persona
    ) VALUES (
      ${input.nome},
      ${input.email},
      ${input.whatsapp},
      ${input.whatsapp},
      ${input.empresa},
      ${input.cargo},
      ${input.tipoDeProduto},
      ${input.volumeEstimadoPaletesMes},
      ${input.exigeTemperaturaControlada},
      ${input.consentLgpd},
      ${input.persona ?? null}
    )
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

export async function markLeadSyncedToSellbot(
  id: number,
  ok: boolean,
  error?: string
): Promise<void> {
  await ensureSchema();
  if (ok) {
    await sql`
      UPDATE leads
      SET sellbot_synced = TRUE,
          sellbot_synced_at = NOW(),
          sellbot_error = NULL
      WHERE id = ${id}
    `;
  } else {
    await sql`
      UPDATE leads
      SET sellbot_synced = FALSE,
          sellbot_error = ${error ?? "unknown"}
      WHERE id = ${id}
    `;
  }
}

export async function listLeads(): Promise<LeadRow[]> {
  await ensureSchema();
  const rows = await sql`
    SELECT id, nome, email, whatsapp, telefone, empresa, cargo,
           tipo_de_produto, volume_estimado_paletesmes, exige_temperatura_controlada,
           mensagem, extras, consent_lgpd, persona,
           sellbot_synced, sellbot_synced_at, sellbot_error,
           created_at
    FROM leads
    ORDER BY created_at DESC
  `;
  return rows as unknown as LeadRow[];
}
