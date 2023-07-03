import { Card } from "@/components/ui/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Course from "./Course";
import SearchBar from "./SearchBar";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Skeleton } from "@/components/ui/ui/skeleton";

interface CourseProps {
  id: string;
  title: string | null;
  image: string | null;
  category: string[];
  describtion: string;
  price: number;
  createdAt: Date;
}

const CoursesList = () => {
  //TODO: get the courses from the api using axios
  const { data: coursesData, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get("/api/course/");
      return data;
    },
  });

  if (isLoading)
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  return (
    <div className="container pt-24 pb-20 flex flex-col flex-wrap">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <SearchBar className="w-full" />
          </div>
          <div className="flex gap-6">
            <Facebook />
            <Twitter />
            <Linkedin />
          </div>
        </div>
        <h1 className="p-3">
          <span className="text-3xl font-bold text-blue-500">Courses</span>{" "}
          <br />
          <span className="text-2xl font-bold">List</span>
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        {coursesData &&
          coursesData.map((course: CourseProps) => (
            <Course key={course?.id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default CoursesList;
