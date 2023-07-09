/*
  Warnings:

  - You are about to drop the column `linkId` on the `Link` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_linkId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "linkId",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
