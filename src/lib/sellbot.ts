export type SellbotLead = {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  cargo: string;
  tipoDeProduto: string;
  volumeEstimadoPaletesMes: string;
  exigeTemperaturaControlada: string;
};

export type SellbotResult =
  | { ok: true; status: number; data: unknown }
  | { ok: false; status: number; error: string };

const DEFAULT_ENDPOINT = "https://api.sellbot.tech/conversions";
const DEFAULT_CAMPAIGN = "form-farma";

function normalizePhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}

export async function sendLeadToSellbot(
  lead: SellbotLead
): Promise<SellbotResult> {
  const apiKey = process.env.SELLBOT_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 0, error: "SELLBOT_API_KEY ausente" };
  }
  const endpoint = process.env.SELLBOT_ENDPOINT || DEFAULT_ENDPOINT;
  const campaign = process.env.SELLBOT_CAMPAIGN || DEFAULT_CAMPAIGN;

  const [firstName, ...rest] = lead.nome.trim().split(/\s+/);
  const lastName = rest.join(" ");

  const body = {
    phone: normalizePhoneBR(lead.whatsapp),
    first_name: firstName,
    last_name: lastName || undefined,
    email: lead.email,
    company_name: lead.empresa,
    job_title: lead.cargo,
    sb_campaign: campaign,
    tipo_de_produto: lead.tipoDeProduto,
    volume_estimado_paletesmes: lead.volumeEstimadoPaletesMes,
    exige_temperatura_controlada: lead.exigeTemperaturaControlada,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    const text = await res.text().catch(() => "");
    let data: unknown = text;
    try {
      data = JSON.parse(text);
    } catch {
      // mantém texto puro
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error:
          (typeof data === "object" && data && JSON.stringify(data)) ||
          `HTTP ${res.status}`,
      };
    }

    return { ok: true, status: res.status, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 0, error: message.slice(0, 500) };
  }
}
