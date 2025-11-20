export interface Post {
  id: number;
  title: string;
  content: string | null;
  slug: string;
  published_at: string;
  created_at: string;
}