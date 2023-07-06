"use client";
import AddReviewModal from "@/app/components/AddReviewModal";
import EnrollButton from "@/app/components/EnrollButton";
import HeroPage from "@/app/components/HeroPage";
import Review from "@/app/components/Review";
import ReviewButton from "@/app/components/ReviewButton";
import { Button } from "@/components/ui/ui/button";
import { Card } from "@/components/ui/ui/card";
import { Skeleton } from "@/components/ui/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound, useParams } from "next/navigation";
import React, { useState } from "react";

interface SingleCourseProps {
  course: {
    id: string;
    title: string | null;
    image: string | null;
    category: string[];
    describtion: string;
    createdAt: Date;
    enrollmentCount: number;
  };
  id: string;
  videoTitle: string;
  videoLink: string;
  duration: number;
  createdAt: Date;
  courseId: string;
  count: number;
}

const CoursePage = () => {
  const params = useParams();
  const { data: course, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/course/${params.id}`);
      return data;
    },
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscribtions"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/subscribtion/${params.id}`);
      return data;
    },
  });

  // getting the reviews by course

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/review/${params.id}`);
      return data;
    },
  });

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [modalIsOpen, setIsModalOpen] = useState<boolean>(false);

  if (!course) return notFound();

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

  const handleReviewButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container pt-20 pb-20">
      {modalIsOpen && (
        <AddReviewModal setIsModalOpen={setIsModalOpen} courseId={course.id} />
      )}
      <HeroPage />
      {course && (
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
              {course?.Lesson?.map((lesson: SingleCourseProps) => (
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
              <Card>
                <div className="flex flex-col gap-4 p-5">
                  <h1 className="text-lg p-3 font-bold">
                    Course Title:{" "}
                    <span className="text-blue-600">{course.title}</span>
                  </h1>
                  <h1 className="text-lg p-3 font-bold">
                    Course Lessons:{" "}
                    <span className="text-blue-600">
                      {course.Lesson?.length}
                    </span>
                  </h1>
                  <h1 className="text-lg p-3 font-bold">
                    Course Enrollments:{" "}
                    <span className="text-blue-600">
                      {subscription?.subscriptionCount}
                    </span>
                  </h1>
                  <EnrollButton courseId={course.id} />
                  <ReviewButton
                    onClick={handleReviewButtonClick}
                    text="Review"
                  />
                </div>
              </Card>
            </div>
          </div>
          <div className="pt-10">
            <h1 className="p-3">
              <span className="text-3xl font-bold text-blue-500">Students</span>
              <br />
              <span className="text-2xl font-bold">Reviews</span>
            </h1>
          </div>
          <div className="grid md:grid-cols-4 gap-11 md:gap-96">
            <Review review={reviews} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
