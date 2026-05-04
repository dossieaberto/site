import { InstitutionalPage } from "@/components/public/institutional-page";
import { getInstitutionalMetadata, getInstitutionalPage } from "@/lib/institutional-pages";

export const metadata = getInstitutionalMetadata("politica-de-privacidade");

export default function PoliticaDePrivacidadePage() {
  return <InstitutionalPage page={getInstitutionalPage("politica-de-privacidade")} />;
}
