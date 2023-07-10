import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";

import { LessonValidator } from "@/app/lib/validators/lessons";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    // if (!session?.user) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const { videoTitle, videoLink, courseId, duration, createdAt, updatedAt } =
      LessonValidator.parse(body);

    // const existedLesson = await prisma.lesson.findFirst({
    //   where: {
    //     videoLink,
    //   },
    // });

    // if (existedLesson) {
    //   return new Response("Already Exists", { status: 409 });
    // }
    const newLesson = await prisma.lesson.create({
      data: {
        videoTitle,
        courseId,
        duration,
        createdAt,
        updatedAt,
      },
    });
    return new NextResponse(JSON.stringify(newLesson), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create course", { status: 500 });
  }
}

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany();
    return new NextResponse(JSON.stringify(lessons), { status: 200 });
  } catch (error) {
    return new Response("Could not find any lesson", { status: 404 });
  }
}
