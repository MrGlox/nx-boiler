import { z } from 'zod';

// Product schema
export const productSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  variantId: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  active: z.boolean().default(true),
  images: z.array(z.string()),
  features: z.array(z.string()),
  metadata: z.any().optional(),
  sort: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Price schema
export const priceSchema = z.object({
  id: z.string().optional(),
  priceId: z.string(),
  nickname: z.string().optional(),
  active: z.boolean().default(true),
  currency: z.string(),
  unitAmount: z.number().positive(),
  type: z.string(),
  billingScheme: z.string().optional(),
  taxBehavior: z.string().optional(),
  isUsageBased: z.boolean().default(false),
  interval: z.string().optional(),
  intervalCount: z.number().optional(),
  usageType: z.string().optional(),
  aggregateUsage: z.string().optional(),
  trialPeriodDays: z.number().optional(),
  metadata: z.any().optional(),
  productId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Subscription schema
export const subscriptionSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  priceId: z.string(),
  status: z.enum(['ACTIVE', 'CANCELLED', 'PAST_DUE']).default('ACTIVE'),
  startDate: z.date(),
  endedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  stripeSubscriptionId: z.string(),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  cancelAtPeriodEnd: z.boolean().default(false),
  canceledAt: z.date().optional(),
  trialStart: z.date().optional(),
  trialEnd: z.date().optional(),
  productId: z.string().optional(),
});

// Payment schema
export const paymentSchema = z.object({
  id: z.string().optional(),
  subscriptionId: z.string(),
  paymentId: z.string(),
  amount: z.number().positive(),
  currency: z.string(),
  invoiceId: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Infer types from schemas
export type Product = z.infer<typeof productSchema>;
export type Price = z.infer<typeof priceSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Payment = z.infer<typeof paymentSchema>;

// Create DTOs
export const createProductDto = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createPriceDto = priceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createSubscriptionDto = subscriptionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  endedAt: true,
  canceledAt: true,
});

export const createPaymentDto = paymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update DTOs
export const updateProductDto = createProductDto.partial();
export const updatePriceDto = createPriceDto.partial();
export const updateSubscriptionDto = createSubscriptionDto.partial();
export const updatePaymentDto = createPaymentDto.partial();

// Infer DTO types
export type CreateProductDto = z.infer<typeof createProductDto>;
export type CreatePriceDto = z.infer<typeof createPriceDto>;
export type CreateSubscriptionDto = z.infer<typeof createSubscriptionDto>;
export type CreatePaymentDto = z.infer<typeof createPaymentDto>;

export type UpdateProductDto = z.infer<typeof updateProductDto>;
export type UpdatePriceDto = z.infer<typeof updatePriceDto>;
export type UpdateSubscriptionDto = z.infer<typeof updateSubscriptionDto>;
export type UpdatePaymentDto = z.infer<typeof updatePaymentDto>;
