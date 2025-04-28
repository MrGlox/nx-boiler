import { z } from 'zod';

const roleSchema = z.enum(['USER', 'ADMIN']).default('USER');

// User schema based on your Prisma model
export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  pseudo: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  password: z.string(),
  preferredLocale: z.string().default('en'),
  active: z.boolean().default(false),
  stripeCustomerId: z.string().optional(),
  rememberMeToken: z.string().optional(),
  emailVerified: z.boolean().default(false),
  role: roleSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Profile schema
export const profileSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  birthday: z.date(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Address schema
export const addressSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  street: z.string(),
  street_optional: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string(),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Session schema
export const sessionSchema = z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expiresAt: z.date(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string(),
  impersonatedBy: z.string().optional(),
});

// Account schema
export const accountSchema = z.object({
  id: z.string().optional(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  idToken: z.string().optional(),
  accessTokenExpiresAt: z.date().optional(),
  refreshTokenExpiresAt: z.date().optional(),
  scope: z.string().optional(),
  password: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Infer types from schemas
export type User = z.infer<typeof userSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type Account = z.infer<typeof accountSchema>;

export type UserById = User & {
  roles: z.infer<typeof roleSchema>[];
};

// Create DTOs
export const createUserDto = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  stripeCustomerId: true,
  rememberMeToken: true,
});

export const createProfileDto = profileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createAddressDto = addressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update DTOs
export const updateUserDto = createUserDto.partial();
export const updateProfileDto = createProfileDto.partial();
export const updateAddressDto = createAddressDto.partial();

// Infer DTO types
export type CreateUserDto = z.infer<typeof createUserDto>;
export type CreateProfileDto = z.infer<typeof createProfileDto>;
export type CreateAddressDto = z.infer<typeof createAddressDto>;

export type UpdateUserDto = z.infer<typeof updateUserDto>;
export type UpdateProfileDto = z.infer<typeof updateProfileDto>;
export type UpdateAddressDto = z.infer<typeof updateAddressDto>;
