import { z } from "zod";

export const SubscribitonValidator = z.object({
  courseId: z.string(),
});

export type CreateSubscribtionPayload = z.infer<typeof SubscribitonValidator>;
