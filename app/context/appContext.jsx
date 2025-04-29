"use client";
import { dummyCourses } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [isInstructor, setIsInstructor] = useState(true);

  const router = useRouter();

  // Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  function caluCulateString(course) {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalString = 0;
    course.courseRatings.forEach((rating) => {
      totalString += rating.rating;
    });
    return totalString / course.courseRatings.length;
  }
  // Function To Course Chapter Time

  const courseChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to Calculate Course duration Time

  const courseDurationTime = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function To Calculate No Of Lecture in this course

  const CalculateNoOfLectures = (course) => {
    let TotalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        TotalLectures += chapter.chapterContent.length;
      }
    });
    return TotalLectures;
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);
  const value = {
    currency,
    allCourses,
    caluCulateString,
    router,
    isInstructor,
    setIsInstructor,
    courseChapterTime,
    courseDurationTime,
    CalculateNoOfLectures,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
