"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { AppContext } from "@/app/context/appContext";

const Navbar = () => {
  const pathname = usePathname();
  const isCourseListPage = pathname.includes("/courselist");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { router, isInstructor, setIsInstructor } = useContext(AppContext);
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b py-4 ${
        isCourseListPage ? "bg-white" : "bg-gray-100/70"
      }`}
    >
      <Image
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={() => router.push("/instructor")}>
                {isInstructor ? "Instructor Dashboard" : "Become Instructor"}
              </button>
              | <Link href={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      {/* Phone Screens */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button>Become Instructor</button>|{" "}
              <Link href={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
          {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()}>
              <Image src={assets.user_icon} alt="user-icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
