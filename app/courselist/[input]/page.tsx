"use client";
import CourseList from "@/app/pages/student/courseList";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const input = params.input;

  return (
    <div>
      <h1>
        <CourseList />
      </h1>
    </div>
  );
};

export default page;
