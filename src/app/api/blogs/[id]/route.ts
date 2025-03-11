import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
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
