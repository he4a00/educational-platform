"use client";
import { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import AddReviewModal from "@/app/components/AddReviewModal";
import EnrollButton from "@/app/components/EnrollButton";
import Review from "@/app/components/Review";
import ReviewButton from "@/app/components/ReviewButton";
import { Button } from "@/components/ui/ui/button";
import { Card } from "@/components/ui/ui/card";
import AddToFavButton from "@/app/components/AddToFavButton";
import Image from "next/image";
import { File, Puzzle, Tv, User } from "lucide-react";
import { Medal } from "lucide-react";

const CoursePage = async () => {
  const params = useParams();
  const { id } = params;
  const [modalIsOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const lessonsPerPage = 5;

  const handleReviewButtonClick = () => {
    setIsModalOpen(true);
  };

  // Calculate the index range of lessons to display based on the current page
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const displayedLessons = course?.Lesson?.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );

  return (
    <div className="container p-4 flex flex-col">
      {modalIsOpen && (
        <AddReviewModal setIsModalOpen={setIsModalOpen} courseId={course.id} />
      )}

      {courseLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className="flex">
            <div className="flex justify-between"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-2/3 flex flex-col">
              <h1 className="p-5 text-2xl font-bold">Course Content</h1>
              <p className="text-gray-900 p-5">
                <span>{course?.sectionsNumber} Sections .</span>
                <span>
                  {""} {course?.Lesson?.length} Lectures .
                </span>
                <span>
                  {""} {course?.hoursNumber} Hour Total Length
                </span>
              </p>
              <div className="flex flex-wrap justify-between flex-col">
                {displayedLessons ? (
                  displayedLessons?.map((lesson: any) => (
                    <div
                      className="flex flex-col md:flex-row justify-between p-5"
                      key={lesson?.id}
                    >
                      <div className="flex items-center gap-3">
                        <h6 className="hover:underline text-md font-bold text-blue-700 cursor-pointer">
                          {lesson?.videoTitle}
                        </h6>
                      </div>
                      <div className="flex gap-6 items-center">
                        {subscription?.isSubscribed ? (
                          <Button>Play</Button>
                        ) : (
                          <Button className="bg-blue-900">Preview</Button>
                        )}
                        <p>05:00</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>There Is No Lessons</div>
                )}

                {/* Pagination controls */}

                {course?.Lesson?.length > lessonsPerPage && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 mr-2 font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      Previous Page
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={indexOfLastLesson >= course?.Lesson?.length}
                      className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      Next Page
                    </button>
                  </div>
                )}
              </div>

              {/* course description */}
              <div className="border-t pt-10">
                <h1 className="pt-3 pb-3 text-lg font-bold">Description</h1>
                <ShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  width={800}
                  truncatedEndingComponent={"... "}
                >
                  <p className="text-gray-950 text-lg">{course?.describtion}</p>
                </ShowMoreText>
              </div>
            </div>

            {courseLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="md:w-1/3 gap-7 w-full">
                <Card className="w-full">
                  <Image
                    width={500}
                    height={10}
                    src={course?.image}
                    alt="course page"
                  />
                  <div className="flex flex-col gap-4 p-5">
                    <h1 className="text-lg p-3 font-bold text-blue-500">
                      {course?.title}
                    </h1>
                    <div className="flex flex-col">
                      <h6 className="font-bold p-4">This Course Includes: </h6>
                      <div className="pl-4">
                        <p className="flex gap-3 items-center pb-2">
                          <Tv className="text-xs" />
                          {course?.hoursNumber} hours on-demand video
                        </p>
                        <p className="flex gap-3 items-center pb-2">
                          <File />
                          {course?.sectionsNumber} sections
                        </p>
                        <p className="flex gap-3 items-center pb-2">
                          <User />
                          {subscription?.subscriptionCount} Enrollments
                        </p>
                        {course?.hasCoupon ? (
                          <p className="flex gap-3 items-center pb-2">
                            <Puzzle />
                            Has Coupon
                          </p>
                        ) : null}
                        {course?.certificateOnComplete ? (
                          <p className="flex gap-3 items- pb-2">
                            <Medal />
                            Certificate of completion
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <EnrollButton
                      isSubscribed={subscription?.isSubscribed === true}
                      courseId={course?.id}
                    />
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
