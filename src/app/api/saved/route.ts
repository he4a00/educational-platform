import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { SavedValidator } from "@/app/lib/validators/saved";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { courseId } = SavedValidator.parse(body);

    const existedSavedCourse = await prisma.savedCourses.findFirst({
      where: {
        userId: session?.user.id,
        courseId: courseId,
      },
    });

    if (existedSavedCourse) {
      return new Response("Already Saved", { status: 409 });
    }

    const savedCourse = await prisma.savedCourses.create({
      data: {
        userId: session?.user.id,
        courseId: courseId,
      },
    });
    return new NextResponse(JSON.stringify(savedCourse), { status: 200 });
  } catch (error) {
    return new Response("Could not create course", { status: 500 });
  }
}
