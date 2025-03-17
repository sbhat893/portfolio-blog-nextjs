import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all comments for a specific blog post
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { blogPostId: params.id },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST a new comment under a blog post
export async function POST(req: Request, { params }: { params: { id: string } }) {
  
  try {    
    const { content, email } = await req.json();
    console.log("this works");
    if (!email || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const newComment = await prisma.comment.create({
      data: { email, content, blogPostId: params.id },
    });
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}