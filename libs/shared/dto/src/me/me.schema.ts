import { z } from "zod";

// Notification schema
export const meSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer types from schemas
export type Me = z.infer<typeof meSchema>;
