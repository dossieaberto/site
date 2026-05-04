import { NextResponse } from "next/server";
import { getNewsletterSubscribers } from "@/lib/data/admin";
import { requireAdmin } from "@/lib/supabase/auth";
import { toCsv } from "@/lib/utils";

export async function GET() {
  await requireAdmin();

  const subscribers = await getNewsletterSubscribers();
  const csv = toCsv(
    subscribers.map((subscriber) => ({
      email: subscriber.email,
      status: subscriber.status,
      created_at: subscriber.createdAt,
    })),
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="newsletter-dossie-aberto.csv"',
    },
  });
}
