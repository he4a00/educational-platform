import { z } from "zod";

export const ReviweValidator = z.object({
  rating: z.number(),
  courseId: z.string(),
  content: z
    .string()
    .min(20, { message: "the content must be at least 20 characters long" })
    .max(300),
});

export type CreateReviewPayload = z.infer<typeof ReviweValidator>;
