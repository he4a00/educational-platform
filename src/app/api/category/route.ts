import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await prisma.course.findMany({
      select: {
        category: true,
      },
    });

    const allCategories = categories.flatMap((category) => category.category);
    const uniqueCategoriesSet = new Set(allCategories);
    const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
    const firstTenUniqueCategories = uniqueCategoriesArray.slice(0, 10);

    return new NextResponse(JSON.stringify(firstTenUniqueCategories), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}
