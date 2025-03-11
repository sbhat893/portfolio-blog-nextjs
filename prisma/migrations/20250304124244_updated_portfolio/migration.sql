/*
  Warnings:

  - Added the required column `cvPath` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "cvPath" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL;
