import { InstitutionalPage } from "@/components/public/institutional-page";
import { getInstitutionalMetadata, getInstitutionalPage } from "@/lib/institutional-pages";

export const metadata = getInstitutionalMetadata("editorial");

export default function EditorialPage() {
  return <InstitutionalPage page={getInstitutionalPage("editorial")} />;
}
