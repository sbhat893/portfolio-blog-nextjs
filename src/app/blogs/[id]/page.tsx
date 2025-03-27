import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { DeleteConfirmation } from "@/app/components/DeleteConfirmation";
import CommentSection from "@/app/components/CommentSection";

interface BlogPostProps {
    params: { id: string };
}

async function fetchBlogPost(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
  
    if (!res.ok) return null;
    return res.json();
}

const BlogPost = async ({ params }: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    const post = await fetchBlogPost(id);
    const session = await getServerSession(authOptions);
  
    if (!post) {
      notFound();
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">{post.date}</p>
        <p className="text-lg mb-6 text-justify">{post.content.split("\n").map((line: number, index: number) => <React.Fragment key={index}>{line}<br/></React.Fragment>)}</p>
        
        {/* Back Button */}
        <div className="flex justify-between items-center mt-6">
      {/* Edit Button - Visible only if user is authenticated */}
      {session && (
        <Link href={`/blogs/edit/${post.id}`}>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition">
            Edit
          </button>
        </Link>
      )}
      {session && <DeleteConfirmation postId={post.id} />}
      {/* Back Button */}
      <Link href="/blogs">
        <span className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer flex items-center justify-center w-12 h-12">
          <ArrowLeft size={24} />
        </span>
      </Link>
    </div>
    <div className="mt-8">
      <CommentSection blogPostId={post.id} />
    </div>
      </div>
    </div>
  );
};

export default BlogPost;
