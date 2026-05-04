import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/data/admin";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Configurações</p>
      <h1 className="mb-2 font-serif text-4xl font-black">Identidade do site</h1>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-muted-foreground">
        Ajuste informações institucionais usadas em áreas públicas do Dossiê Aberto.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
