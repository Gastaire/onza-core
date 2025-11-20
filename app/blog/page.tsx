import { Header } from "@/components/ui/Header";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import Link from "next/link";

async function getPosts() {
  const { data, error } = await supabase.from("posts").select();

  if (error) {
    console.error(error);
    return [];
  }

  return data as Post[];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="bg-secondary text-primary min-h-screen">
        <div className="container mx-auto px-8 py-24">
          <h1 className="text-5xl font-serif text-center mb-16">
            The OnzaCore Journal
          </h1>
          <div className="max-w-2xl mx-auto">
            {posts.length > 0 ? (
              <ul className="space-y-8">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block p-6 border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <h2 className="text-3xl font-semibold mb-2">
                        {post.title}
                      </h2>
                      <p className="text-primary/80">
                        {new Date(post.published_at).toLocaleDateString()}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-primary/80">
                No posts yet. Check back soon.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}