import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/app/blogs/page";
import { ArrowLeft } from "lucide-react";
import React from "react";

const BlogPost = async ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = await params;
    const post = blogPosts.find((post) => post.id === resolvedParams.id);
  
    if (!post) {
      notFound();
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">{post.date}</p>
        <p className="text-lg mb-6 text-justify">{post.content.split("\n").map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>)}</p>
        
        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <Link href="/blogs">
            <span className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer flex items-center justify-center w-12 h-12">
              <ArrowLeft size={24} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
