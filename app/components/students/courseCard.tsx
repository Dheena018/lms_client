import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import Link from "next/link";

const CourseCard = ({ course }: { course: any }) => {
  const { currency, caluCulateString } = useContext(AppContext);
  console.log(currency);

  return (
    <Link
      href={"/course/" + course._id}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <Image
        src={course.courseThumbnail}
        alt=""
        className="w-full"
        width={100}
        height={100}
      />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator.name}</p>
        <div className="flex items-center space-x-2">
          <p>{caluCulateString(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={
                  i < Math.floor(caluCulateString(course))
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
          <p>{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-600">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
