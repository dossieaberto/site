import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({
  endpoint: z.string().url(),
  keys: z.record(z.string(), z.string()),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Inscrição inválida." }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { ok: false, message: "Configure o Supabase para salvar inscrições push." },
      { status: 503 },
    );
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase não configurado." }, { status: 503 });
  }

  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      endpoint: parsed.data.endpoint,
      keys: parsed.data.keys,
    },
    { onConflict: "endpoint" },
  );

  if (error) {
    return NextResponse.json({ ok: false, message: "Erro ao salvar inscrição." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
