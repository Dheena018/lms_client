"use client";
import React, { useContext, useEffect, useState } from "react";
import Loading from "@/app/components/students/Loading";
import { AppContext } from "@/app/context/appContext";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useParams } from "next/navigation";
// import humanizeDuration from "humanize-duration";
import Footer from "@/app/components/students/footer";
import YouTube from "react-youtube";
const humanizeDuration = require("humanize-duration");

interface courseDatas {
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
}

const CourseDetails = () => {
  const { id } = useParams();
  const {
    currency,
    allCourses,
    caluCulateString,
    CalculateNoOfLectures,
    courseChapterTime,
    courseDurationTime,
  } = useContext(AppContext);
  const [courseData, setCourseData] = useState<courseDatas | null>(null);
  const [playerData, setPlayerData] = useState<playerDatas | null>(null);
  const [openSection, setOpenSection] = useState<any>({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((item: any) => item._id === id);
    setCourseData(findCourse);
  };

  const toggleIcons = (index: any) => {
    setOpenSection((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);
  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className=" absolute top-0 left-0 w-full h-72 -z-10 bg-gradient-to-b from-cyan-100/70"></div>
        <div className="">
          <h1 className="md:text-[36px] text-[26px] font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          />
          {/* Reviews and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{caluCulateString(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={
                    i < Math.floor(caluCulateString(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="Star"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p>
              ({courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}
            </p>
          </div>
          <p className="text-sm">
            course by{" "}
            <span className="text-blue-600 underline">Mass Dheena</span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((course: any, index: number) => (
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
                            src={assets.play_icon}
                            alt="play-icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                >
                                  preview
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
          </div>
          <div className="py-20 text-sm text-[24px]">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="max-w-[424px] z-10 shadow-lg rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <Image
              src={courseData.courseThumbnail}
              alt=""
              width={450}
              height={450}
            />
          )}
          <div className="p-5">
            <div>
              <Image
                src={assets.time_left_clock_icon}
                alt="left-clock-icon"
                className="w-3.5"
              />
              <p className="text-red-500">
                {" "}
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-[15px] gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <Image src={assets.star} alt="star" />
                <p>{caluCulateString(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <Image src={assets.time_clock_icon} alt="clock_icon" />
                <p>{courseDurationTime(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <Image src={assets.lesson_icon} alt="lesson_icon" />
                <p>{CalculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What&apos;s in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-[15px] list-disc text-gray-500">
                <li>LifeTime access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
