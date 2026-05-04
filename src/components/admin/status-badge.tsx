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
  const tone =
    status === "published" || status === "approved"
      ? "border-secondary/40 text-secondary"
      : status === "pending" || status === "draft"
        ? "border-border text-muted-foreground"
        : "border-accent/40 text-accent";

  return (
    <span className={`inline-flex rounded-full border bg-background px-2.5 py-1 text-xs font-black ${tone}`}>
      {labels[status]}
    </span>
  );
}
