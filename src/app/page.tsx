"use client";

import CoursesList from "./components/CoursesList";
import HeroPage from "./components/HeroPage";

export default function Home() {
  return (
    <main className="">
      <HeroPage />
      <CoursesList />
    </main>
  );
}
