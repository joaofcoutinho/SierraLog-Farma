"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  async function onClick() {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }
  return (
    <Button variant="secondary" size="sm" onClick={onClick}>
      Sair
    </Button>
  );
}
