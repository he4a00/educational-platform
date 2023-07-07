import { Skeleton } from "@/components/ui/ui/skeleton";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex gap-5 md:flex-row flex-col container p-10">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-500" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-500" />
          <Skeleton className="h-4 w-[200px]  bg-gray-500" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-500" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-500" />
          <Skeleton className="h-4 w-[200px]  bg-gray-500" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-500" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-500" />
          <Skeleton className="h-4 w-[200px]  bg-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
