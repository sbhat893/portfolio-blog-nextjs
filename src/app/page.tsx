import Image from "next/image";
import Link from "next/link";
import React from "react";

const Portfolio = () => {
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 p-6 text-white">
      <div className="max-w-3xl bg-white p-8 shadow-2xl rounded-lg text-center text-gray-900">
        <Image 
          src="/profile.jpg" 
          alt="Profile Picture" 
          width={150} 
          height={150} 
          className="rounded-full mx-auto mb-4 border-4 border-blue-600" 
        />
        <h1 className="text-5xl font-bold mb-4">Welcome...</h1>
        <p className="text-lg mb-6">
          Hi, I'm a passionate Software Engineer specializing in C/C++ Systems and Applications Development.
          I love building efficient and secure softwares.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/my_cv.pdf" download>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
              Download My CV
            </button>
          </Link>

          <Link href="/blogs">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg text-lg shadow-md hover:bg-purple-700 transition">
              Read My Posts
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
