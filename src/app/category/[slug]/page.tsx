"use client";

import Course from "@/app/components/Course";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

const CoursesByCategory = () => {
  const params = useParams();

  const { data: CoursesByCategory, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/category/${params.slug}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </>
    );
  }

  return (
    <div className="container pt-20">
      <h1 className="p-5">
        <span className="text-3xl font-bold text-blue-500">
          {params.slug} Courses
        </span>{" "}
        <br />
        <span className="text-2xl font-bold">List</span>
      </h1>
      {Array.isArray(CoursesByCategory) &&
        CoursesByCategory.map((course: any) => (
          <Course className="m-7" key={course?.id} course={course} />
        ))}
    </div>
  );
};

export default CoursesByCategory;
