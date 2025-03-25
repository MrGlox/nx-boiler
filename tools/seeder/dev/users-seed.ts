import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';


// Number of fake users to generate
const NUM_USERS = 50;

export async function seedUsers(prismaClient: PrismaClient) {
  console.log(`Seeding ${NUM_USERS} users...`);

  const prisma = prismaClient;

  // Create users in batches for better performance
  const batchSize = 10;
  const batches = Math.ceil(NUM_USERS / batchSize);
  const saltRounds = 10;

  for (let i = 0; i < batches; i++) {
    const usersToCreate = [];

    const currentBatchSize = Math.min(batchSize, NUM_USERS - i * batchSize);

    for (let j = 0; j < currentBatchSize; j++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const password = faker.internet.password({ length: 12 });
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      usersToCreate.push({
        email: faker.internet.email({ firstName, lastName }),
        pseudo: `${firstName} ${lastName}`,
        password: hashedPassword,
        role: 'USER',
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }

    await prisma.user.createMany({
      data: usersToCreate,
      skipDuplicates: true, // Skip records that would cause unique constraint violations
    });

    console.log(`Created batch ${i + 1}/${batches} of users`);
  }

  console.log('User seeding completed!');
}

// Only run directly if this file is executed directly
if (require.main === module) {
  const prisma = new PrismaClient();

  async function main() {
    try {
      await seedUsers(prisma);
    } catch (error) {
      console.error('Error seeding users:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  main();
}