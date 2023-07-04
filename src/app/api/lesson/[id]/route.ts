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
    const singleCourse = await prisma.lesson.findFirst({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(singleCourse), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}
