import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-20">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 w-[300px] md:w-[350px] lg:w-[400px] rounded-2xl bg-gray-100 p-4 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="h-48 md:h-56 lg:h-64 w-full bg-gray-300 rounded-xl"></div>

          {/* Type Skeleton */}
          <div className="h-5 w-20 bg-gray-300 rounded-full"></div>

          {/* Title Skeleton */}
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>

          {/* Description Skeleton */}
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>

          {/* Price Skeleton */}
          <div className="h-5 w-1/3 bg-gray-300 rounded-full mt-2"></div>

          {/* Button Skeleton */}
          <div className="h-10 w-full bg-gray-300 rounded-full mt-1"></div>
        </div>
      ))}
    </div>
  );
};  

export default Loading;
