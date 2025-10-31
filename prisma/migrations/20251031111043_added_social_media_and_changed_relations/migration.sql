-- CreateTable
CREATE TABLE "public"."SocialMedia" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_artistId_key" ON "public"."SocialMedia"("artistId");

-- AddForeignKey
ALTER TABLE "public"."SocialMedia" ADD CONSTRAINT "SocialMedia_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
