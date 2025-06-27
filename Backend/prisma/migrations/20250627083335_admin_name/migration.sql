/*
  Warnings:

  - Added the required column `adminName` to the `admin_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_accounts" ADD COLUMN     "adminName" TEXT NOT NULL;
