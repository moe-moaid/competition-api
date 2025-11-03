import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Delete tables with dependencies first (children)
  await prisma.payment.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.video.deleteMany();
  await prisma.socialMedia.deleteMany();

  // Then delete the artists (they depend on avatar/location)
  await prisma.artist.deleteMany();

  // Finally delete parent/independent tables
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


