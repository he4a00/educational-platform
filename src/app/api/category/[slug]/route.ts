import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: ParamsProps) {
  const { slug } = params;

  try {
    const coursesByCategory = await prisma.course.findMany({
      where: {
        category: {
          has: slug,
        },
      },
    });
    return new NextResponse(JSON.stringify(coursesByCategory), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}
