import { z } from "zod";

export const CourseValidator = z.object({
  title: z.string().max(40),
  price: z.number(),
  describtion: z.string(),
  image: z.string(),
  category: z.array(z.string()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  enrollmentCount: z.number().optional(),
  userId: z.string().optional(),
});

export type CreateCoursePayload = z.infer<typeof CourseValidator>;
