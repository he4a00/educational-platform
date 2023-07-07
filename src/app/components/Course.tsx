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
    createdAt: Date;
  };
  className: string;
}

const Course = ({ course, className }: CourseProps) => {
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
              <p
                key={idx}
                className="text-gray-500 cursor-pointer flex gap-4 hover:text-black"
              >
                {cat}
              </p>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4">
          <ViewButton text="View" id={course.id} />
        </div>
      </div>
    </div>
  );
};

export default Course;
