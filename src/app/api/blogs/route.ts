import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

// Fetch all blog posts
export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" }, // Sort by newest first
    });
    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

// Create a new blog post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, summary, content, author } = await req.json();

  try {
    const newBlogPost = await prisma.blogPost.create({
      data: { title, summary, content, author },
    });

    return NextResponse.json(newBlogPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}