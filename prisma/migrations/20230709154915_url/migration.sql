/*
  Warnings:

  - You are about to drop the column `link` on the `Link` table. All the data in the column will be lost.
  - Added the required column `url` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "link",
ADD COLUMN     "url" TEXT NOT NULL;
