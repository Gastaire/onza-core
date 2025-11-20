import { Header } from "@/components/ui/Header";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as Post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-secondary text-primary min-h-screen">
        <div className="container mx-auto px-8 py-24">
          <article>
            <h1 className="text-5xl font-serif text-center mb-4">
              {post.title}
            </h1>
            <p className="text-center text-primary/80 mb-12">
              {new Date(post.published_at).toLocaleDateString()}
            </p>
            <div
              className="prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </article>
        </div>
      </main>
    </>
  );
}