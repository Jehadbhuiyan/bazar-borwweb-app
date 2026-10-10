"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NebLink = () => {
  const pathname = usePathname();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
      );

      const result = await res.json();
      setData(result);
    };

    getCategories();
  }, []);

  return (
    <div className="mt-6 sm:mt-10 w-full max-w-7xl mx-auto pt-3 sm:pt-5 px-3 sm:px-4">
      <div className="flex gap-3 sm:gap-5 overflow-x-auto sm:overflow-visible sm:flex-wrap pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* সব */}
        <Link href="/">
          <span
            className={`text-sm sm:text-base font-bold whitespace-nowrap px-2 py-1 rounded-lg transition-colors ${
              pathname === "/"
                ? "bg-green-50 text-[#05893e]"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            সব
          </span>
        </Link>

        {/* Categories */}
        {data.map((items) => {
          const isActive = pathname === `/nebcetagory/${items.slug}`;

          return (
            <Link key={items.id} href={`/nebcetagory/${items.slug}`}>
              <div
                className={`shrink-0 cursor-pointer px-2 py-1 rounded-lg transition-colors ${
                  isActive ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">{items.icon}</span>

                  <span
                    className={`text-sm sm:text-base font-bold whitespace-nowrap ${
                      isActive
                        ? "text-[#05893e]"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                  >
                    {items.nameBn}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NebLink;
