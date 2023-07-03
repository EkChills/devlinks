/*
  Warnings:

  - You are about to drop the column `version` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
