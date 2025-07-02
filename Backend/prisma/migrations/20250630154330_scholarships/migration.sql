/*
  Warnings:

  - You are about to drop the column `scholarshipApplicationForm` on the `scholarships` table. All the data in the column will be lost.
  - Added the required column `scholarshipDocuments` to the `scholarships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scholarships" DROP COLUMN "scholarshipApplicationForm",
ADD COLUMN     "scholarshipDocuments" JSONB NOT NULL;
