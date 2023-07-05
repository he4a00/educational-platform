import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/ui/skeleton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/ui/card";
import { Button, buttonVariants } from "@/components/ui/ui/button";
import Link from "next/link";

interface ReviewProps {
  id: string;
  username: string | null;
  userId: string;
  userImage: string | null;
  content: string;
  rating: number;
  courseId: string;
  createdAt: Date;
  course: {
    id: string;
    title: string | null;
    image: string | null;
    category: string[];
    describtion: string;
    price: number;
    createdAt: Date;
  };
}

const ReviewsList = () => {
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get("/api/review/");
      return data;
    },
  });

  if (isLoading)
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  return (
    <div className="container pt-24 pb-20 flex flex-col flex-wrap">
      <div>
        <h1 className="p-3">
          <span className="text-3xl font-bold text-blue-500">Students</span>{" "}
          <br />
          <span className="text-2xl font-bold">Reviews</span>
        </h1>
      </div>
      <div className="grid md:grid-cols-4 md:gap-96 ">
        {Array.isArray(reviewsData) &&
          reviewsData.map((course: ReviewProps) => (
            <>
              <div
                key={course.id}
                className="p-10 w-[350px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md card-container flex flex-col justify-between"
              >
                <h1 className="text-2xl font-bold text-blue-500 truncate mb-3">
                  {course.course.title}
                </h1>

                <h4 className="text-gray-500 mb-3">{course.rating}/5</h4>
                <p className="text-gray-500 mb-2">{course.content}</p>

                <div className="flex gap-5 items-center">
                  <Image
                    className="rounded-full"
                    src={course.userImage || ""}
                    width={50}
                    height={50}
                    alt="user image"
                  />
                  <h1 className="text-xl font-bold text-blue-500">
                    {course.username}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/course/${course.course.id}`}
                    className={`${buttonVariants()} w-full mt-3`}
                  >
                    Visit Course
                  </Link>
                  <Link
                    href={`/review`}
                    className={`${buttonVariants()} bg-blue-600 w-full mt-3`}
                  >
                    Add Review
                  </Link>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default ReviewsList;
