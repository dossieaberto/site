import type { Article, CommentStatus } from "@/types/content";

const labels: Record<Article["status"] | CommentStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

export function StatusBadge({ status }: { status: Article["status"] | CommentStatus }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-black">
      {labels[status]}
    </span>
  );
}
