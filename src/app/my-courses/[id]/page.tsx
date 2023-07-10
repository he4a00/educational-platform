"use client";
import Course from "@/app/components/Course";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

interface CourseProps {
  course: {
    id: string;
    title: string | null;
    image: string | null;
    category: string[];
    describtion: string;
    createdAt: Date;
  };
}

const MyCourses = () => {
  const params = useParams();
  const { id } = params;

  const { data: subscribedCourses, isLoading: subscribedCoursesLoading } =
    useQuery({
      queryKey: ["courses"],
      queryFn: async () => {
        const { data } = await axios.get(`/api/user/${id}`);
        return data;
      },
    });

  if (subscribedCoursesLoading) {
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
          Subscribed Courses
        </span>{" "}
        <br />
        <span className="text-2xl font-bold">List</span>
      </h1>
      {Array.isArray(subscribedCourses) &&
        subscribedCourses.map((course: CourseProps) => (
          <Course
            className="m-7"
            key={course?.course?.id}
            course={course?.course}
          />
        ))}
    </div>
  );
};

export default MyCourses;
