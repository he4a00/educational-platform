import { z } from "zod";

export const LessonValidator = z.object({
  videoTitle: z.string().max(40),
  videoLink: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  duration: z.number(),
  courseId: z.string(),
});

export type CreateLessonePayload = z.infer<typeof LessonValidator>;
