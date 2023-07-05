import { Button } from "@/components/ui/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ViewButton from "./ViewButton";
import ReviewButton from "./ReviewButton";
import AddReviewModal from "./AddReviewModal";

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
  const [modalIsOpen, setIsModalOpen] = useState<boolean>(false);
  const handleReviewButtonClick = () => {
    setIsModalOpen(true);
  };
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
      {modalIsOpen && (
        <AddReviewModal setIsModalOpen={setIsModalOpen} courseId={course.id} />
      )}
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
          <ViewButton text="View" id={course.id} />
          <Button disabled={status === "unauthenticated"}>Enroll</Button>
          <ReviewButton
            onClick={handleReviewButtonClick}
            disabled={status === "unauthenticated"}
            text="Review"
          />
        </div>
        <p className="text-gray-500">{formattedCreatedAt}</p>
      </div>
    </div>
  );
};

export default Course;
