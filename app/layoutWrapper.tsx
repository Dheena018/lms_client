"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/students/navbar";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInstructorRoute = pathname.startsWith("/instructor");

  return (
    <>
      {/* Top right auth buttons */}
      <header className="hidden justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Show main navbar only outside instructor routes */}
      {!isInstructorRoute && <Navbar />}

      <main>{children}</main>
    </>
  );
}
