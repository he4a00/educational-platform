import { getAuthSession } from "@/app/lib/auth";
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
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const subscribtion = await prisma.subscription.findFirst({
      where: {
        userId: session?.user.id,
        courseId: id,
      },
    });

    const subscriptionCount = await prisma.subscription.count({
      where: {
        courseId: id,
      },
    });

    const isSubscribed = !!subscribtion;
    return new NextResponse(
      JSON.stringify({ isSubscribed, subscriptionCount }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Something went wrong", { status: 404 });
  }
}
