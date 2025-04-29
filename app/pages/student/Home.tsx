// import Footer from "@/app/components/instructors/footer";
import CallToAction from "@/app/components/students/callToAction";
import Companies from "@/app/components/students/companies";
import CoursesSection from "@/app/components/students/coursesSection";
import Footer from "@/app/components/students/footer";
import Hero from "@/app/components/students/Hero";
import TestimonialSection from "@/app/components/students/testimonialSection";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
