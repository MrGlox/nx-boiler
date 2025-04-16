import { z } from 'zod';

// Notification schema
export const notificationSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR']).default('INFO'),
  action: z
    .enum(['NoUserAction', 'Featured', 'UserActionRequired'])
    .default('NoUserAction'),
  status: z.enum(['Sent', 'Queued']).default('Queued'),
  message: z.string(),
  read: z.boolean().default(false),
  email: z.boolean().default(false),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Newsletter schema
export const newsletterSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  type: z.enum(['SUBSCRIBE', 'PROMOTION', 'ANNOUNCEMENT', 'OTHER']),
  active: z.boolean().default(true),
  description: z.string().optional(),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Infer types from schemas
export type Notification = z.infer<typeof notificationSchema>;
export type Newsletter = z.infer<typeof newsletterSchema>;

// Create DTOs
export const createNotificationDto = notificationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createNewsletterDto = newsletterSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update DTOs
export const updateNotificationDto = createNotificationDto.partial();
export const updateNewsletterDto = createNewsletterDto.partial();

// Infer DTO types
export type CreateNotificationDto = z.infer<typeof createNotificationDto>;
export type CreateNewsletterDto = z.infer<typeof createNewsletterDto>;

export type UpdateNotificationDto = z.infer<typeof updateNotificationDto>;
export type UpdateNewsletterDto = z.infer<typeof updateNewsletterDto>;
