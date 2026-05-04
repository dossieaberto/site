import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { CATEGORIES, SITE_NAME } from "@/lib/constants";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={CATEGORIES} siteName={SITE_NAME} />
      <main className="flex-1">{children}</main>
      <Footer categories={CATEGORIES} siteName={SITE_NAME} />
    </div>
  );
}
