"use client";
import { AppContext } from "@/app/context/appContext";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "@/app/components/students/footer";
import Rating from "@/app/components/students/Rating";
interface courseDatas {
  id: string;
  courseTitle: any;
  courseDescription: any;
  courseRatings: any;
  enrolledStudents: any;
  discount: any;
  coursePrice: any;
  courseThumbnail: any;
  courseContent: any;
}
interface playerDatas {
  videoId: any;
  lectureUrl: any;
  chapter: any;
  lectureTitle: any;
  lecture: any;
}

const Player = () => {
  const { enrolledCourse, courseChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<courseDatas | null>(null);
  const [openSection, setOpenSection] = useState<any>({});
  const [playerData, setPlayerData] = useState<playerDatas | null>(null);
  console.log("courseData", courseData?.courseThumbnail);

  const getCourseData = () => {
    enrolledCourse.map((course: courseDatas, index: number) => {
      console.log(course);

      if (course.id === courseId) {
        setCourseData(course);
      }
    });
  };

  const toggleIcons = (index: any) => {
    setOpenSection((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };
  useEffect(() => {
    getCourseData();
  }, [enrolledCourse]);
  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Left side */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((course: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleIcons(index)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        className={` transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="down_arrow_icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {course.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-defa">
                      {course.chapterContent.length} lectures -{" "}
                      {courseChapterTime(course)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    } `}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {course.chapterContent.map((lecture: any, i: number) => (
                        <li key={i} className="flex items-center gap-2 py-1">
                          <Image
                            src={
                              false ? assets.blue_tick_icon : assets.play_icon
                            }
                            alt="play-icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                >
                                  Watch
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">
              Rate this course: <Rating initialRating={0} onRate={""} />
            </h1>
          </div>
        </div>
        {/* Rigth side */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="text-blue-600">
                  {false ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : courseData?.courseThumbnail ? (
            <Image
              src={courseData.courseThumbnail}
              alt="Course thumbnail"
              width={500}
              height={300}
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
