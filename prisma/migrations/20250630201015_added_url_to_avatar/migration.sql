/*
  Warnings:

  - A unique constraint covering the columns `[avatarId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatarId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "avatarId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Avatar" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_avatarId_key" ON "Artist"("avatarId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
