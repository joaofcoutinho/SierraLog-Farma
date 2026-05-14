import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Dashboard | Sierralog",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="font-display text-xl font-bold text-brand-dark">
              Sierralog · Dashboard
            </p>
            <p className="text-xs text-neutral-500">Logado como {session.email}</p>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
