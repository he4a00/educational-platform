"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import AddReviewModal from "@/app/components/AddReviewModal";
import EnrollButton from "@/app/components/EnrollButton";
import HeroPage from "@/app/components/HeroPage";
import Review from "@/app/components/Review";
import ReviewButton from "@/app/components/ReviewButton";
import { Button } from "@/components/ui/ui/button";
import { Card } from "@/components/ui/ui/card";
import { Skeleton } from "@/components/ui/ui/skeleton";
import AddToFavButton from "@/app/components/AddToFavButton";

interface SingleCourseProps {
  course: {
    id: string;
    title: string | null;
    image: string | null;
    category: string[];
    description: string;
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
  const { id } = params;

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/course/${id}`);
      return data;
    },
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscribtions"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/subscribtion/${id}`);
      return data;
    },
  });

  const { data: savedCourse } = useQuery({
    queryKey: ["savedCourses"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/saved/${id}`);
      return data;
    },
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/review/${id}`);
      return data;
    },
  });

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [modalIsOpen, setIsModalOpen] = useState<boolean>(false);

  const handleReviewButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container pt-20 pb-20">
      {modalIsOpen && (
        <AddReviewModal setIsModalOpen={setIsModalOpen} courseId={course.id} />
      )}

      {courseLoading ? (
        <LoadingSkeleton />
      ) : (
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
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-2/3">
              {subscription?.isSubscribed ? (
                course?.Lesson?.map((lesson: SingleCourseProps) => (
                  <div
                    className="flex jutify-between p-5 text-blue-500"
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
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center border rounded-lg">
                  <h1 className="text-2xl font-bold">
                    You Are Not Subscriped To This Course
                  </h1>
                </div>
              )}
            </div>
            {courseLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="md:w-1/3 gap-7 w-full">
                <Card className="w-full">
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
                      disabled={subscription?.isSubscribed === false}
                    />
                    <AddToFavButton
                      courseId={course?.id}
                      text="Add To Favourite"
                    />
                  </div>
                </Card>
              </div>
            )}
          </div>
          <div className="pt-10">
            <h1 className="p-3">
              <span className="text-3xl font-bold text-blue-500">Students</span>
              <br />
              <span className="text-2xl font-bold">Reviews</span>
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-11 md:gap-26">
            {reviews?.map((review: any) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
