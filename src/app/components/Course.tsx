import { Button } from "@/components/ui/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import ViewButton from "./ViewButton";

interface CourseProps {
  course: {
    id: string;
    title: string | null;
    image: string | null;
    category: string[];
    describtion: string;
    price: number;
    createdAt: Date;
  };
  className: string;
}

const Course = ({ course, className }: CourseProps) => {
  const { status } = useSession();
  const DateFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const formattedCreatedAt =
    course.createdAt instanceof Date
      ? DateFormatter.format(course.createdAt)
      : "";
  return (
    <div
      className={`${className} flex flex-col md:flex-row gap-8 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded`}
    >
      <div className="">
        <Image
          src={course?.image || ""}
          width={400}
          height={400}
          alt="course photo"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl text-blue-400 mb-4 hover:underline cursor-pointer">
          {course?.title}
        </h1>
        <p className="mb-4">{course?.describtion}</p>
        <div className="flex gap-4">
          {course?.category?.map((cat, idx) => {
            return (
              <p key={idx} className="text-gray-500 cursor-pointer flex gap-4">
                {cat}
              </p>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4">
          <ViewButton
            text="View"
            id={course.id}
            disabled={status === "unauthenticated"}
          />
          <Button disabled={status === "authenticated"}>Enroll</Button>
          <Button disabled={status === "authenticated"} variant="outline">
            Review
          </Button>
        </div>
        <p className="text-gray-500">{formattedCreatedAt}</p>
      </div>
    </div>
  );
};

export default Course;
