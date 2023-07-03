import { Card } from "@/components/ui/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Course from "./Course";

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

const CoursesList = () => {
  //TODO: get the courses from the api using axios
  const { data: coursesData } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get("/api/course/");
      return data;
    },
  });

  return (
    <div className="container pt-24 pb-20 flex flex-col flex-wrap">
      <div>
        <h1 className="p-3">
          <span className="text-3xl font-bold text-blue-500">Courses</span>{" "}
          <br />
          <span className="text-2xl font-bold">List</span>
        </h1>
      </div>
      <div className="flex flex-1">
        {coursesData &&
          coursesData.map((course: CourseProps) => (
            <Course key={course.course?.id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default CoursesList;
