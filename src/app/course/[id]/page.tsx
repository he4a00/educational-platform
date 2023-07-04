"use client";
import Course from "@/app/components/Course";
import HeroPage from "@/app/components/HeroPage";
import { Button } from "@/components/ui/ui/button";
import { Skeleton } from "@/components/ui/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface SingleCourseProps {
  course: {
    id: string;
    title: string | null;
    image: string | null;
    category: string[];
    describtion: string;
    price: number;
    createdAt: Date;
  };
  id: string;
  videoTitle: string;
  videoLink: string;
  duration: number;
  createdAt: Date;
}

const CoursePage = () => {
  const params = useParams();

  const { data: singleCourseData, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/course/${params.id}`);
      return data;
    },
  });

  const [videoUrl, setVideoUrl] = useState<string>("QFaFIcGhPoM");

  if (isLoading)
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div className="container pt-20 pb-20">
      <HeroPage />
      {singleCourseData && (
        <div>
          <div className="flex items-center justify-center p-5">
            <iframe
              width="1280"
              height="720"
              src={`https://www.youtube.com/embed/${videoUrl}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-2/3">
              {singleCourseData?.Lesson?.map((lesson: SingleCourseProps) => (
                <div
                  className="flex justify-between p-5 text-blue-500"
                  key={lesson.id}
                >
                  <div>
                    <h1 className="text-xl font-bold p-2">
                      {lesson.videoTitle}
                    </h1>
                    <p className="text-gray-500 p-2">{lesson.duration}</p>
                  </div>
                  <div>
                    <Button
                      onClick={() => setVideoUrl(lesson.videoLink)}
                      className="bg-blue-500"
                    >
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/3 gap-7">
              <Course className="flex-wrap" course={singleCourseData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
