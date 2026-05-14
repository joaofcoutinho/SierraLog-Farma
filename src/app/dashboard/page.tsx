import { listLeads, type LeadRow } from "@/lib/db";
import { LeadsTable } from "./leads-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function startOfDayUtc(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function countSince(leads: LeadRow[], sinceMs: number): number {
  return leads.filter((l) => new Date(l.created_at).getTime() >= sinceMs).length;
}

export default async function DashboardPage() {
  const leads = await listLeads();
  const now = new Date();
  const todayMs = startOfDayUtc(now).getTime();
  const last7Ms = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const last30Ms = now.getTime() - 30 * 24 * 60 * 60 * 1000;

  const stats = [
    { label: "Total", value: leads.length },
    { label: "Hoje", value: countSince(leads, todayMs) },
    { label: "Últimos 7 dias", value: countSince(leads, last7Ms) },
    { label: "Últimos 30 dias", value: countSince(leads, last30Ms) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">
          Leads
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Contatos recebidos via formulário do site.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-neutral-200 bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {s.label}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-dark">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
