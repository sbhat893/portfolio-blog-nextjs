import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await prisma.comment.delete({ where: { id: id } });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
