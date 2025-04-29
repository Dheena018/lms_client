"use client";
import CourseCard from "@/app/components/students/courseCard";
import Footer from "@/app/components/students/footer";
import SearchBar from "@/app/components/students/searchBar";
import { AppContext } from "@/app/context/appContext";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const CourseList = () => {
  const { router, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourse = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourse.filter((item: any) =>
              item.courseTitle.toLowerCase().includes(input)
            )
          )
        : setFilteredCourse(tempCourse);
    }
  }, [allCourses, input]);
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course list
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => router.push("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <Image
              src={assets.cross_icon}
              alt="cross-icon"
              onClick={() => router.push("/courselist")}
              className="cursor-pointer"
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.map((course: any, index: number) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseList;
