import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export const blogPosts = [
    {
      id: uuidv4(),
      title: "My First Blog Post",
      content: "This is the content of the first blog post.",
    },
    {
      id: uuidv4(),
      title: "Getting Started with Next.js",
      content: "A beginner's guide to Next.js and React.",
    },
  ];

const Blogs = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Blog Posts</h1>

        {blogPosts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No posts available.</p>
        ) : (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-700 mt-2">{post.content}</p>
                <Link href={`/blogs/${post.id}`}>
                  <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
