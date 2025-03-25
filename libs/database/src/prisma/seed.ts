import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data if needed
  await prisma.notification.deleteMany({});
  await prisma.newsletter.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.price.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.token.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.user.deleteMany({});

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      active: true,
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          birthday: new Date('1990-01-01'),
        },
      },
    },
  });

  // Create regular user
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      role: 'USER',
      active: true,
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Regular',
          lastName: 'User',
          birthday: new Date('1995-05-15'),
        },
      },
      address: {
        create: {
          street: '123 Main St',
          city: 'Anytown',
          country: 'USA',
          postalCode: '12345',
        },
      },
    },
  });

  // Create products
  const product = await prisma.product.create({
    data: {
      productId: 'prod_basic',
      name: 'Basic Subscription',
      description: 'Basic subscription with limited features',
      active: true,
      images: ['https://example.com/basic.jpg'],
      features: ['Feature 1', 'Feature 2'],
      sort: 1,
    },
  });

  const premiumProduct = await prisma.product.create({
    data: {
      productId: 'prod_premium',
      name: 'Premium Subscription',
      description: 'Premium subscription with all features',
      active: true,
      images: ['https://example.com/premium.jpg'],
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      sort: 2,
    },
  });

  // Create prices
  const monthlyPrice = await prisma.price.create({
    data: {
      priceId: 'price_basic_monthly',
      nickname: 'Basic Monthly',
      currency: 'USD',
      unitAmount: 9.99,
      type: 'recurring',
      interval: 'month',
      intervalCount: 1,
      productId: product.productId,
    },
  });

  const yearlyPrice = await prisma.price.create({
    data: {
      priceId: 'price_basic_yearly',
      nickname: 'Basic Yearly',
      currency: 'USD',
      unitAmount: 99.99,
      type: 'recurring',
      interval: 'year',
      intervalCount: 1,
      productId: product.productId,
    },
  });

  const premiumPrice = await prisma.price.create({
    data: {
      priceId: 'price_premium_monthly',
      nickname: 'Premium Monthly',
      currency: 'USD',
      unitAmount: 19.99,
      type: 'recurring',
      interval: 'month',
      intervalCount: 1,
      productId: premiumProduct.productId,
    },
  });

  // Create subscription for user
  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      priceId: monthlyPrice.priceId,
      productId: product.id,
      status: 'ACTIVE',
      startDate: new Date(),
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      stripeSubscriptionId: 'sub_123456',
    },
  });

  // Create payment for subscription
  await prisma.payment.create({
    data: {
      subscriptionId: subscription.id,
      paymentId: 'pay_123456',
      amount: 9.99,
      currency: 'USD',
      status: 'COMPLETED',
      invoiceId: 'inv_123456',
    },
  });

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: user.id,
      message: 'Welcome to our platform!',
      type: 'INFO',
      action: 'NoUserAction',
      status: 'Sent',
      read: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: user.id,
      message: 'Please complete your profile',
      type: 'WARNING',
      action: 'UserActionRequired',
      status: 'Sent',
      read: false,
    },
  });

  // Create newsletter subscription
  await prisma.newsletter.create({
    data: {
      userId: user.id,
      email: user.email,
      type: 'SUBSCRIBE',
      active: true,
      description: 'Weekly newsletter',
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
