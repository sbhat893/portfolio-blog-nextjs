const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.createMany({
    data: [
      {
        title: "Introduction to Next.js",
        summary: "A beginner's guide to building applications with Next.js.",
        content: "Next.js is a React framework that enables server-side rendering and static site generation.",
        author: "Sumukh Bhat",
      },
      {
        title: "Understanding Prisma ORM",
        summary: "Learn how Prisma ORM simplifies database management in modern applications.",
        content: "Prisma provides an intuitive API for working with databases in a type-safe manner.",
        author: "Sumukh Bhat",
      },
    ],
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
