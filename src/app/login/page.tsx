import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login | Sierralog",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl md:p-10">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-brand-dark">
            Acesso administrativo
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Dashboard de leads Sierralog
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
