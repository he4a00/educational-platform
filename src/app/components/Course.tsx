import { Button } from "@/components/ui/ui/button";
import { Card } from "@/components/ui/ui/card";
import Image from "next/image";
import React from "react";

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
}

const Course = ({ course }: CourseProps) => {
  const DateFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <div className="flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
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
        {course?.category.map((cat, idx) => {
          return (
            <p className="text-gray-500 cursor-pointer" key={idx}>
              {cat}
            </p>
          );
        })}
        <div className="flex gap-4 mt-4">
          <Button className="bg-blue-600">View</Button>
          <Button>Enroll</Button>
          <Button variant="outline">Review</Button>
        </div>

        {/* <p className="text-gray-500">
            {DateFormatter.format(course?.createdAt)}
          </p> */}
      </div>
    </div>
  );
};

export default Course;
