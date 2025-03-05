import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const portfolio = await prisma.portfolio.findFirst();
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}
