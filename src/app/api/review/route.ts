import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { CourseValidator } from "@/app/lib/validators/course";
import { ReviweValidator } from "@/app/lib/validators/reviews";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { content, rating, courseId } = ReviweValidator.parse(body);

    const existedReview = await prisma.review.findFirst({
      where: {
        userId: session?.user.id,
        courseId
      },
    });

    // const existedCourse = await prisma.course.findFirst({
    //   where: {
    //     title,
    //   },
    // });

    if (existedReview) {
      return new Response("You Already Reviewed This Course", { status: 409 });
    }
    // if (existedCourse) {
    //   return new Response("There Is No Such A Course", { status: 404 });
    // }

    const newReview = await prisma.review.create({
      data: {
        content,
        courseId,
        rating,
        userId: session.user.id,
        userImage: session.user.image || "",
        username: session.user.name || "",
      },
    });
    return new NextResponse(JSON.stringify(newReview), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create course", { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      include: {
        course: true,
      },
    });

    return new NextResponse(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    return new Response("Could not find any reviews", { status: 404 });
  }
}
