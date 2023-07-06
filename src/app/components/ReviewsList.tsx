import React from "react";
import Review from "./Review";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReviewsList = () => {
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get("/api/review/");
      return data;
    },
  });

  return (
    <div className="container pt-24 pb-20 flex flex-col flex-wrap">
      <div>
        <h1 className="p-3">
          <span className="text-3xl font-bold text-blue-500">Students</span>
          <br />
          <span className="text-2xl font-bold">Reviews</span>
        </h1>
      </div>
      <div className="grid md:grid-cols-4 gap-11 md:gap-96">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(
            reviewsData?.map((review: any) => (
              <Review key={review.id} review={review} />
            ))
          ) &&
          reviewsData?.map((review: any) => (
            <Review key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
