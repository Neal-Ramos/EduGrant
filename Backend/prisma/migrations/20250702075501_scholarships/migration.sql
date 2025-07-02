/*
  Warnings:

  - You are about to drop the column `scholarshipName` on the `scholarships` table. All the data in the column will be lost.
  - Added the required column `scholarshipProvider` to the `scholarships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scholarshipTitle` to the `scholarships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scholarships" DROP COLUMN "scholarshipName",
ADD COLUMN     "scholarshipProvider" TEXT NOT NULL,
ADD COLUMN     "scholarshipTitle" TEXT NOT NULL;
