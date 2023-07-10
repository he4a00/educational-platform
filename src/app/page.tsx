"use client";

import Categories from "./components/Categories";
import CoursesList from "./components/CoursesList";
import HeroPage from "./components/HeroPage";
import ReviewsList from "./components/ReviewsList";

export default function Home() {
  return (
    <main className="">
      {/* <HeroPage /> */}
      <CoursesList />
      <Categories />
      <ReviewsList />
    </main>
  );
}
