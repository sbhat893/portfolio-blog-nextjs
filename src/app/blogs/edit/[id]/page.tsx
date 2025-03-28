"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditBlogPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await res.json();
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setAuthor(data.author);
      } catch (err) {
        setError("Error fetching blog post");
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, summary, content, author }),
      });

      if (!res.ok) {
        throw new Error("Failed to update blog post");
      }

      router.push("/blogs");
    } catch (err) {
      setError("Error updating blog post");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
