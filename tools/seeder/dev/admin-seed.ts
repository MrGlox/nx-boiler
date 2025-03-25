import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export async function seedAdmin(prismaClient: PrismaClient) {
  console.log('Seeding admin user...');

  // Use the passed prisma client instead of creating a new one
  const prisma = prismaClient;

  // Get admin details from environment variables
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
  const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adminPassword123';
  const ADMIN_AVATAR = process.env.ADMIN_AVATAR || 'https://ui-avatars.com/api/?name=Admin+User';

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log(`Admin user with email ${ADMIN_EMAIL} already exists. Skipping creation.`);
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        pseudo: ADMIN_NAME,
        password: hashedPassword,
        // avatar: ADMIN_AVATAR,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add any admin-specific fields here, such as role
        role: 'ADMIN',
      },
    });

    console.log(`Admin user created with email: ${admin.email}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

// Only run directly if this file is executed directly
if (require.main === module) {
  const prisma = new PrismaClient();

  async function main() {
    try {
      await seedAdmin(prisma);
    } catch (error) {
      console.error('Error seeding admin:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  main();
}
