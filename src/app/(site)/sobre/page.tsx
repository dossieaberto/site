import { InstitutionalPage } from "@/components/public/institutional-page";
import { getInstitutionalMetadata, getInstitutionalPage } from "@/lib/institutional-pages";

export const metadata = getInstitutionalMetadata("sobre");

export default function SobrePage() {
  return <InstitutionalPage page={getInstitutionalPage("sobre")} />;
}
