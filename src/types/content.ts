export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  id: string;
  email?: string | null;
  fullName: string;
  slug: string;
  role?: "admin" | "editor";
  bio?: string | null;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  ogImage?: string | null;
  category: Category;
  tags: Tag[];
  author: Author;
  status: "draft" | "published" | "archived";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  isFeatured: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  views?: number;
};

export type CommentStatus = "pending" | "approved" | "rejected";

export type Comment = {
  id: string;
  articleId: string;
  name: string;
  body: string;
  status: CommentStatus;
  createdAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  createdAt: string;
};

export type SiteSettings = {
  site_name: string;
  site_description: string;
  main_author_name: string;
  contact_email: string;
  footer_text: string;
  instagram_url: string;
  x_url: string;
};
