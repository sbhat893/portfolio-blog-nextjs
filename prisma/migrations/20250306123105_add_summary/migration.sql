/*
  Warnings:

  - Added the required column `summary` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "summary" TEXT NOT NULL;
