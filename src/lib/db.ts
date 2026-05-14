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
          telefone TEXT NOT NULL,
          empresa TEXT NOT NULL,
          cargo TEXT,
          mensagem TEXT,
          extras JSONB,
          consent_lgpd BOOLEAN NOT NULL DEFAULT FALSE,
          persona TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
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
  telefone: string;
  empresa: string;
  cargo: string | null;
  mensagem: string | null;
  extras: Record<string, unknown> | null;
  consent_lgpd: boolean;
  persona: string | null;
  created_at: string;
};

export async function insertLead(input: {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo?: string | null;
  mensagem?: string | null;
  extras?: Record<string, unknown> | null;
  consentLgpd: boolean;
  persona?: string | null;
}): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO leads (
      nome, email, telefone, empresa, cargo, mensagem, extras, consent_lgpd, persona
    ) VALUES (
      ${input.nome},
      ${input.email},
      ${input.telefone},
      ${input.empresa},
      ${input.cargo ?? null},
      ${input.mensagem ?? null},
      ${input.extras ? JSON.stringify(input.extras) : null},
      ${input.consentLgpd},
      ${input.persona ?? null}
    )
  `;
}

export async function listLeads(): Promise<LeadRow[]> {
  await ensureSchema();
  const rows = await sql`
    SELECT id, nome, email, telefone, empresa, cargo, mensagem, extras,
           consent_lgpd, persona, created_at
    FROM leads
    ORDER BY created_at DESC
  `;
  return rows as unknown as LeadRow[];
}
