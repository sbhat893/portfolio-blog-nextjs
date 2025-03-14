import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const profilePicture = formData.get("profilePicture") as File | null;
    const cvFile = formData.get("cvFile") as File | null;

    if (!name || !description) {
      return NextResponse.json({ error: "Name and Description are required" }, { status: 400 });
    }

    // Define file paths
    const publicDir = path.join(process.cwd(), "public");
    const profilePicPath = path.join(publicDir, "profile.jpg");
    const cvPath = path.join(publicDir, "my_cv.pdf");

    // Save profile picture
    if (profilePicture) {
      const profileBuffer = Buffer.from(await profilePicture.arrayBuffer());
      fs.writeFileSync(profilePicPath, profileBuffer);
    }

    // Save CV
    if (cvFile) {
      const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
      fs.writeFileSync(cvPath, cvBuffer);
    }

    // Create a new portfolio entry
    const newPortfolio = await prisma.portfolio.create({
      data: {
        name,
        description,
        profilePicture: "profile.jpg",
        cvPath: "my_cv.pdf",
      },
    });

    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}
