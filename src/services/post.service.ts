import { Post, Comment } from "@/types/post";

export const postService = {
  async getPosts(): Promise<Post[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  },

  async getPostById(id: number): Promise<Post> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
    if (!res.ok) throw new Error("Post not found");
    return res.json();
  },

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments?postId=${postId}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
  },
};
