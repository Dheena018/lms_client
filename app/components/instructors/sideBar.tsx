"use client";
import { AppContext } from "@/app/context/appContext";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const menuItems = [
    { name: "Dashboard", path: "/instructor", icon: assets.home_icon },
    {
      name: "Add Course",
      path: "/instructor/add-course",
      icon: assets.add_icon,
    },
    {
      name: "My Course",
      path: "/instructor/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/instructor/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];
  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
        {menuItems.map((menu) => {
          return (
            <Link href={""}>
              <Image src={menu.icon} alt="menu-cion" className="w-6 h-6" />
              <p className="md:block hidden text-center">{menu.name}</p>
            </Link>
          );
        })}
      </div>
    )
  );
};

export default Sidebar;
