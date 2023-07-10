import { Card, Text } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/category/");
      return data;
    },
  });

  console.log(categories);

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
      <h1 className="p-3 mb-5">
        <span className="text-3xl font-bold text-blue-500">
          Topics Recommended
        </span>
        <br />
        <span className="text-2xl font-bold">For You</span>
      </h1>
      <div className="flex md:flex-row flex-col w-full gap-4">
        {categories?.map((category: string) => {
          return (
            <Card key={category} isHoverable isPressable variant="bordered">
              <Card.Body>
                <Link href={`/category/${category}`}>
                  <h1 className="text-xl font-bold">{category}</h1>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
