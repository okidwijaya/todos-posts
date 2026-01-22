"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { postService } from "../services/post.service";
import { Comment, Post } from "../types/post";
import LoadingSpinner from "./loading";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsComment, setPostsComment] = useState<Comment[]>([]);
  const [postFetching, setPostFetching] = useState<boolean>(false);
  const [postFetchingError, setPostFetchingError] = useState<boolean>(false);

  const [searchId, setSearchId] = useState<number | undefined>(undefined);

  const fetchPosts = async () => {
    setPostFetching(true);
    setPostFetchingError(false);

    try {
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err) {
      setPostFetchingError(true);
    } finally {
      setPostFetching(false);
    }
  };

  const searchById = async (id?: number) => {
    setPostsComment([]);
    if (id === undefined || id === null) {
      fetchPosts();
      return;
    }

    setPostFetching(true);
    setPostFetchingError(false);

    try {
      const data = await postService.getCommentsByPostId(id);
      setPostsComment(data);
    } catch (err) {
      setPostsComment([]);
      setPostFetchingError(true);
    } finally {
      setPostFetching(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchId === undefined) {
      fetchPosts();
    }
  }, [searchId]);

  return (
    <div className="flex min-h-screen items-start justify-center bg-white text-black">
      <main className="w-full">

        <div className="bg-[#121212] w-full flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-white font-semibold">
            YVENTURES
          </Link>
          <Link
            href="/todos"
            className="text-white border-b border-transparent hover:border-white"
          >
            Todos
          </Link>
        </div>

        <div className="py-10 px-4 max-w-6xl mx-auto flex flex-col gap-6">
          <div className="relative w-full max-w-4xl mx-auto">
            <button
              className="absolute right-3 top-2.5 z-10 bg-[#121212] rounded-full p-2"
              onClick={() => searchById(searchId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <input
              type="number"
              value={searchId ?? ""}
              placeholder="Search Post By ID"
              className="w-full h-14 pl-6 pr-12 border border-[#4e4e4e4b] rounded-full"
              onChange={(e) =>
                setSearchId(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchById(searchId);
                }
              }}
            />
          </div>

          {postsComment.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {postsComment.map((comment) => (
                <div
                  key={comment.id}
                  className="w-full max-w-xs border border-[#4e4e4e4b] rounded-2xl p-4 shadow"
                >
                  <h2 className="font-semibold mb-2">{comment.name}</h2>
                  <p>{comment.body}</p>
                </div>
              ))}
            </div>
          ) : postFetching ? (
            <LoadingSpinner />
          ) : postFetchingError ? (
            <div className="text-center">
              <p className="text-red-500 text-xl font-semibold mb-4">
                Error fetching posts
              </p>
              <button
                className="bg-[#121212] text-white px-4 py-2 rounded"
                onClick={fetchPosts}
              >
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No data to show
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.slice(0, 10).map((post) => (
                <div
                  key={post.id}
                  className="w-full max-w-xs border border-[#4e4e4e4b] rounded-2xl p-4 shadow"
                >
                  <h2 className="font-semibold mb-2">{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
