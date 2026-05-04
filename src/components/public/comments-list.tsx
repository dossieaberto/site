import { formatDateTime, initials } from "@/lib/utils";
import type { Comment } from "@/types/content";

export function CommentsList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <p className="mt-4 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
        Ainda não há comentários aprovados nesta matéria.
      </p>
    );
  }

  return (
    <div className="mt-5 space-y-4">
      {comments.map((comment) => (
        <article key={comment.id} className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-black">
              {initials(comment.name)}
            </span>
            <div>
              <h3 className="font-black">{comment.name}</h3>
              <p className="text-xs text-muted-foreground">{formatDateTime(comment.createdAt)}</p>
            </div>
          </div>
          <p className="mt-3 leading-7 text-foreground/90">{comment.body}</p>
        </article>
      ))}
    </div>
  );
}
