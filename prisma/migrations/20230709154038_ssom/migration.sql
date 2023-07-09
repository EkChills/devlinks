/*
  Warnings:

  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - Added the required column `link` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "url",
ADD COLUMN     "link" TEXT NOT NULL;
