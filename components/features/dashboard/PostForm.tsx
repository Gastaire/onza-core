"use client";

import { Post } from "@/lib/types";
import { useState } from "react";

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Partial<Post>) => void;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, slug, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-3 bg-white border border-primary/20 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-lg font-medium">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full mt-2 p-3 bg-white border border-primary/20 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-lg font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full mt-2 p-3 bg-white border border-primary/20 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-secondary px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}