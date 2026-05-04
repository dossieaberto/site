import { InstitutionalPage } from "@/components/public/institutional-page";
import { getInstitutionalMetadata, getInstitutionalPage } from "@/lib/institutional-pages";

export const metadata = getInstitutionalMetadata("contato");

export default function ContatoPage() {
  return <InstitutionalPage page={getInstitutionalPage("contato")} />;
}
