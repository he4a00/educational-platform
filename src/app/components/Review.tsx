import { Button, buttonVariants } from "@/components/ui/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Review = ({ review }: any) => {
  return (
    <div
      key={review?.id}
      className="p-10 w-[350px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md card-container flex flex-col justify-between"
    >
      <h1 className="text-2xl font-bold text-blue-500 truncate mb-3">
        {review?.course?.title || ""}
      </h1>
      <h4 className="text-gray-500 mb-3">{review?.rating}/5</h4>
      <p className="text-gray-500 mb-2">{review?.content}</p>
      <div className="flex gap-5 items-center">
        <Image
          className="rounded-full"
          src={review?.userImage || ""}
          width={50}
          height={50}
          alt="user image"
        />
        <h1 className="text-xl font-bold text-blue-500">
          {review?.username || ""}
        </h1>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/course/${review?.course?.id}`}
          className={`${buttonVariants()} w-full mt-3`}
        >
          Visit Course
        </Link>
      </div>
    </div>
  );
};

export default Review;
