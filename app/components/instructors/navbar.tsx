"use client";
import { assets, dummyEducatorData } from "@/assets/assets";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const InstructorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link href={"/"}>
        <Image src={assets.logo} alt="logo-cion" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative ">
        <p>Hi! {user ? user.fullName : "Developers"}</p>
        {user ? (
          <UserButton />
        ) : (
          <Image
            className="max-w-8"
            src={assets.profile_img}
            alt="profile-icon"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
