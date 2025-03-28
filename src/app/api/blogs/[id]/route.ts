import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/utils/authOptions";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing blog post ID" }, { status: 400 });
  }

  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id: id },
    });

    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

// Update a blogpost
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {id} = await params;
  const { title, summary, content } = await req.json();

  if (!id || (!title && !content && !summary)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: { title, summary, content },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// Delete a blog post
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {id} = await params;

  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}