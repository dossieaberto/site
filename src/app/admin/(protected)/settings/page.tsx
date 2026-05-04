import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/data/admin";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Configurações</p>
      <h1 className="mb-6 text-3xl font-black">Configurações do site</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
