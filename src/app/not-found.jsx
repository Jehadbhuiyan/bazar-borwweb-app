'use client'
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-[100px] sm:text-[140px] font-extrabold leading-none text-green-100">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl">🔎</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-gray-500 leading-7">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি হয়তো মুছে ফেলা হয়েছে,
          সরিয়ে নেওয়া হয়েছে অথবা ঠিকানা পরিবর্তন করা হয়েছে।
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#05893e] text-white font-bold text-sm sm:text-base hover:bg-green-700 transition"
          >
            🏠 হোম পেজে ফিরে যান
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-green-200 text-[#05893e] font-bold text-sm sm:text-base hover:bg-green-50 transition"
          >
            ← আগের পেজে যান
          </button>

        </div>

        {/* Small message */}
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#05893e] text-xs sm:text-sm">
          <span>🌿</span>
          <span>বাজার দর — সঠিক দামের তথ্য খুঁজুন</span>
        </div>

      </div>
    </main>
  );
};

export default NotFound;