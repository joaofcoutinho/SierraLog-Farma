"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LeadRow } from "@/lib/db";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = typeof v === "string" ? v : JSON.stringify(v);
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadCsv(leads: LeadRow[]) {
  const headers = [
    "id",
    "criado_em",
    "nome",
    "email",
    "telefone",
    "empresa",
    "cargo",
    "mensagem",
    "extras",
    "consent_lgpd",
    "persona",
  ];
  const rows = leads.map((l) => [
    l.id,
    l.created_at,
    l.nome,
    l.email,
    l.telefone,
    l.empresa,
    l.cargo,
    l.mensagem,
    l.extras,
    l.consent_lgpd,
    l.persona,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.map(csvEscape).join(","))].join(
    "\n"
  );
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-sierralog-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<LeadRow | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.nome, l.email, l.telefone, l.empresa, l.cargo, l.mensagem]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q))
    );
  }, [leads, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Buscar por nome, e-mail, empresa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:max-w-sm"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => downloadCsv(filtered)}
          disabled={filtered.length === 0}
        >
          Exportar CSV
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">E-mail</th>
                <th className="px-4 py-3 font-semibold">Telefone</th>
                <th className="px-4 py-3 font-semibold">Empresa</th>
                <th className="px-4 py-3 font-semibold">Cargo</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-neutral-500"
                  >
                    Nenhum lead encontrado.
                  </td>
                </tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-neutral-50">
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                    {formatDate(l.created_at)}
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-dark">
                    {l.nome}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    <a
                      href={`mailto:${l.email}`}
                      className="text-accent hover:underline"
                    >
                      {l.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-700">
                    {l.telefone}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{l.empresa}</td>
                  <td className="px-4 py-3 text-neutral-700">{l.cargo ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(l)}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <LeadDetails lead={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function LeadDetails({
  lead,
  onClose,
}: {
  lead: LeadRow;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-dark">
              {lead.nome}
            </h2>
            <p className="text-sm text-neutral-500">
              Recebido em {formatDate(lead.created_at)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-neutral-400 hover:text-neutral-700"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Detail label="E-mail" value={lead.email} link={`mailto:${lead.email}`} />
          <Detail
            label="Telefone"
            value={lead.telefone}
            link={`tel:${lead.telefone.replace(/\D/g, "")}`}
          />
          <Detail label="Empresa" value={lead.empresa} />
          <Detail label="Cargo" value={lead.cargo ?? "—"} />
          <Detail label="Persona" value={lead.persona ?? "—"} />
          <Detail
            label="LGPD"
            value={lead.consent_lgpd ? "Aceito" : "Não aceito"}
          />
        </dl>

        {lead.mensagem && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Mensagem
            </p>
            <p className="mt-2 whitespace-pre-wrap rounded-md bg-neutral-50 p-4 text-sm text-brand-dark">
              {lead.mensagem}
            </p>
          </div>
        )}

        {lead.extras && Object.keys(lead.extras).length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Campos adicionais
            </p>
            <dl className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Object.entries(lead.extras).map(([k, v]) => (
                <Detail key={k} label={k} value={String(v)} />
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-brand-dark">
        {link ? (
          <a href={link} className="text-accent hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
