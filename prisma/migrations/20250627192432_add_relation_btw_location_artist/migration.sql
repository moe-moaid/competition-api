/*
  Warnings:

  - You are about to drop the column `artistId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Made the column `locationId` on table `Artist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_artistId_fkey";

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "locationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "artistId";

-- CreateIndex
CREATE UNIQUE INDEX "Artist_locationId_key" ON "Artist"("locationId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
