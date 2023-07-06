import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";

import { CourseValidator } from "@/app/lib/validators/course";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      category,
      createdAt,
      describtion,
      image,
      price,
      title,
      updatedAt,
      enrollmentCount,
    } = CourseValidator.parse(body);

    const existedCourse = await prisma.course.findFirst({
      where: {
        title,
      },
    });

    if (existedCourse) {
      return new Response("Already Exists", { status: 409 });
    }
    const newCourse = await prisma.course.create({
      data: {
        category,
        describtion,
        image,
        title,
        price,
        createdAt,
        updatedAt,
        enrollmentCount,
        userId: session?.user.id,
      },
    });
    return new NextResponse(JSON.stringify(newCourse), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create course", { status: 500 });
  }
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        Lesson: true,
        Review: true,
      },
    });
    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response("Could not find any course", { status: 404 });
  }
}
