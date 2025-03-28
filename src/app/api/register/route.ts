import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("Received body");
    const { username, password } = await req.json();

    if (!username || !password) {
      console.log("No username or password");
      return new Response(JSON.stringify({ error: "Username and password are required" }), { status: 400 });
    }

    const existingUser = await prisma.owner.findUnique({ where: { username } });
    if (existingUser) {
      console.log("User alerady present");
      return new Response(JSON.stringify({ error: "Username already taken" }), { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    
    const newUser = await prisma.owner.create({
      data: { username, password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "User registered successfully", user: newUser }), { status: 201 });
  } catch (error) {
    console.log("Something else");
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
