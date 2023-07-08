import { z } from "zod";

export const SavedValidator = z.object({
  courseId: z.string(),
});

export type CreateSavedPayload = z.infer<typeof SavedValidator>;
