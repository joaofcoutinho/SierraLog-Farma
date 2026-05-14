import { NextResponse } from "next/server";
import { z } from "zod";
import { setSessionCookie, validateCredentials } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
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
      { ok: false, error: "invalid_input" },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  if (!validateCredentials(email, password)) {
    return NextResponse.json(
      { ok: false, error: "invalid_credentials" },
      { status: 401 }
    );
  }

  await setSessionCookie(email.trim().toLowerCase());
  return NextResponse.json({ ok: true });
}
