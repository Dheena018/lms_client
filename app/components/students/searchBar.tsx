"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = ({ data }: { data: any }) => {
  const router = useRouter();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e: any) => {
    e.preventDefault();
    router.push("/courselist/" + input);
  };
  return (
    <div>
      <form
        onSubmit={onSearchHandler}
        className="max-w-xl w-full md:h-14 h-12 flex items-center justify-center bg-white border border-gray-500/20 rounded"
      >
        <Image
          src={assets.search_icon}
          alt="search_icon"
          className="md:w-auto w-10 px-3"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for courses"
          className="w-full h-full outline-none text-gray-500/80"
        />
        <button
          type="submit"
          className="bg-blue-500 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
