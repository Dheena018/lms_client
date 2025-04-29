import { assets, dummyTestimonial } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TestimonialSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h1 className="text-3xl font-medium text-gray-800">Testimonials</h1>
      <p className="md:text-base text-gray-500 mt-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla sint
        ipsa sunt quas dolorum, autem quos at, <br></br> officiis, aspernatur
        obcaecati aut suscipit eum ab id?
      </p>
      <div className="flex justify-center items-center gap-8 mt-14 px-36">
        {dummyTestimonial.map((testimonial, i) => (
          <div
            key={i}
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden shadow-black/5"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                    className="h-5"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
            </div>
            <Link href={"#"} className="text-blue-500 underline px-5">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
