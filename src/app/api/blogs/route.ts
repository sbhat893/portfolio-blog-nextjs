import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
export async function POST(req: Request) {
  try {
    const { title, summary, content, author } = await req.json(); // Ensure correct field names

    if (!title || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPost = await prisma.blogPost.create({
      data: { 
        title, 
        summary,
        content, 
        author, 
        createdAt: new Date(),
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}


// Update a blog post
export async function PATCH(req: Request) {
  try {
    const { id, title, content } = await req.json();

    if (!id || (!title && !content)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// Delete a blog post
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing blog post ID" }, { status: 400 });
    }

    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({ message: "Blog post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
