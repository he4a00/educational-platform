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
    const courseReviews = await prisma.review.findMany({
      where: {
        courseId: id,
      },
      include: {
        course: true,
      },
      take: 6,
    });

    return new NextResponse(JSON.stringify(courseReviews), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}
