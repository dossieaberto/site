import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        h2: ({ children }) => <h2 className="mt-10 text-2xl font-black">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-8 text-xl font-black">{children}</h3>,
        p: ({ children }) => <p className="mt-5 leading-8 text-foreground/90">{children}</p>,
        a: ({ children, href }) => (
          <a className="font-bold text-accent underline-offset-4 hover:underline" href={href}>
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 leading-8">{children}</ul>,
        ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 leading-8">{children}</ol>,
        blockquote: ({ children }) => (
          <blockquote className="mt-7 border-l-4 border-accent bg-muted px-5 py-4 font-semibold">
            {children}
          </blockquote>
        ),
        code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{children}</code>,
        hr: () => <hr className="my-8 border-border" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
