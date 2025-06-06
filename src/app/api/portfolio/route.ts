import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    });
    return new Response(JSON.stringify(portfolios), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch portfolios" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Start using POST, PATCH and DELETE once the APIs are secured.
/*
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPortfolio = await prisma.portfolio.create({ data: body });
    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create portfolio" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...data } = await req.json();
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedPortfolio, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json({ message: "Portfolio deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 });
  }
}
*/
