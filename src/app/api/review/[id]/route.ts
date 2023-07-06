import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: ParamsProps) {
  const { id } = params;
  try {
    const courseReviews = await prisma.review.findFirst({
      where: {
        courseId: id,
      },
      take: 6,
      include: {
        course: true,
      },
    });

    return new NextResponse(JSON.stringify(courseReviews), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}
