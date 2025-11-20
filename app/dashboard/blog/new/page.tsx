"use client";

import { PostForm } from "@/components/features/dashboard/PostForm";
import { Header } from "@/components/ui/Header";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import { useRouter } from "next/navigation";
import Scene from "@/components/3d/Scene";

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (post: Partial<Post>) => {
    const { data, error } = await supabase.from("posts").insert(post).select();

    if (error) {
      console.error(error);
    } else {
      router.push("/dashboard/blog");
    }
  };

  return (
    <>
      <Header />
      <Scene />
      <main className="min-h-screen pt-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-surface/10 -z-10 pointer-events-none" />
        
        <div className="container mx-auto px-8">
          <div className="glass-effect rounded-2xl p-8 border border-border/20 backdrop-blur-xl">
            <h1 className="text-4xl font-bold mb-16 text-foreground tracking-tight">New Post</h1>
            <div className="bg-surface/5 p-8 rounded-lg border border-border/10">
                <PostForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}