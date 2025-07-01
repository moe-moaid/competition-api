import { PrismaClient } from '@prisma/client';
import * as mainSeeder from './seeders/seeds';
const prisma = new PrismaClient();
async function main() {
await mainSeeder.seed(prisma);
}

main()
  .catch((error: any) => {
    throw new Error(`Seeding faild: ${error.message}`);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
