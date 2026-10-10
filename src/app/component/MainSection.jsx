'use client'
import Image from "next/image";
import React from "react";

const MainSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="card bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
        <div className="flex-1">
          <div className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <p className="text-[#05893e] text-xs font-medium">{date}</p>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05893e] m-2 pt-2 sm:pt-3 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-[13px] sm:text-[15px] text-gray-500 pt-2 sm:pt-3 m-2">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, <br className="hidden lg:block" />
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-4 sm:mt-6 m-2">
            <button className="w-full sm:w-auto bg-[#05893e] hover:bg-[#046c31] text-white text-sm sm:text-base font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        <div className="shrink-0 flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="image"
            height={400}
            width={400}
            className="w-48 sm:w-64 md:w-72 lg:w-100 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default MainSection;