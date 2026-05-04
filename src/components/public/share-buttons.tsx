"use client";

import { Copy, Send, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Compartilhar notícia">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface hover:border-accent hover:text-accent"
        aria-label="Compartilhar no LinkedIn"
      >
        <Share2 aria-hidden size={18} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface hover:border-accent hover:text-accent"
        aria-label="Compartilhar no Facebook"
      >
        <Share2 aria-hidden size={18} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface hover:border-accent hover:text-accent"
        aria-label="Compartilhar no X"
      >
        <Send aria-hidden size={18} />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-bold hover:border-accent hover:text-accent"
      >
        <Copy aria-hidden size={16} />
        {copied ? "Copiado" : "Copiar link"}
      </button>
    </div>
  );
}
