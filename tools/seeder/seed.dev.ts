import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Import seeders
import { seedAdmin } from './dev/admin-seed';
import { seedUsers } from './dev/users-seed';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding...');

    // Run admin seeder first
    await seedAdmin(prisma);

    // Then run user seeder
    await seedUsers(prisma);

    // Add other seed functions here as needed

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
