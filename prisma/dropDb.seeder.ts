import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.video.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.location.deleteMany();
  await prisma.avatar.deleteMany();
  console.log(
    'Dropped DB Successfully',
  );
}


main()
  .catch((error: any) => {
    throw new Error(`Seeding faild: ${error.message}`);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


