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

export default async function BlogManagementPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="bg-secondary text-primary min-h-screen">
        <div className="container mx-auto px-8 py-24">
          <div className="flex justify-between items-center mb-16">
            <h1 className="text-5xl font-serif">Blog Management</h1>
            <Link
              href="/dashboard/blog/new"
              className="bg-primary text-secondary px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              New Post
            </Link>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {posts.length > 0 ? (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="flex justify-between items-center p-4 border-b border-primary/10"
                  >
                    <Link
                      href={`/dashboard/blog/edit/${post.id}`}
                      className="text-xl font-semibold hover:underline"
                    >
                      {post.title}
                    </Link>
                    <span className="text-primary/80">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-primary/80">
                No posts yet. Create your first one!
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}