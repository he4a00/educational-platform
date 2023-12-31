import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { SavedValidator } from "@/app/lib/validators/saved";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: ParamsProps) {
  const { id } = params;
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const savedCourse = await prisma.savedCourses.findFirst({
      where: {
        userId: session?.user.id,
        courseId: id,
      },
    });

    const isSaved = !!savedCourse;
    return new NextResponse(JSON.stringify(isSaved), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: ParamsProps) {
  const { id } = params;
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const unsaveCourse = await prisma.savedCourses.deleteMany({
      where: {
        courseId: id,
        userId: session?.user.id,
      },
    });

    const isSaved = !unsaveCourse;
    return new NextResponse(JSON.stringify(isSaved), { status: 200 });
  } catch (error) {
    return new Response("Could not create course", { status: 500 });
  }
}
