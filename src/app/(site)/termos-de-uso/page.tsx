import { InstitutionalPage } from "@/components/public/institutional-page";
import { getInstitutionalMetadata, getInstitutionalPage } from "@/lib/institutional-pages";

export const metadata = getInstitutionalMetadata("termos-de-uso");

export default function TermosDeUsoPage() {
  return <InstitutionalPage page={getInstitutionalPage("termos-de-uso")} />;
}
