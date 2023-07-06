import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { SubscribitonValidator } from "@/app/lib/validators/subscribtion";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { courseId } = SubscribitonValidator.parse(body);

    const existedSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session?.user.id,
        courseId: courseId,
      },
    });
    if (existedSubscription) {
      return new Response("Subscription already exists", { status: 409 });
    }

    const subscribtion = await prisma.subscription.create({
      data: {
        userId: session?.user.id,
        courseId: courseId,
      },
    });
    return new NextResponse(JSON.stringify(subscribtion), { status: 200 });
  } catch (error) {
    return new Response("Could not make the subscribtion", { status: 404 });
  }
}
