import { bnNumber } from "@/app/component/commonfile/Tktextconvart";
import { getUnitBn } from "@/app/component/commonfile/Unitconvart";
import Link from "next/link";
import React from "react";

const SelectItems = async ({ params }) => {
  const { cetagoryId } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${cetagoryId}`,
  );

  const data = await res.json();
  console.log("data check", data);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="my-10 text-center text-gray-400">কোনো পণ্য পাওয়া যায়নি</p>
    );
  }
  const image = data[0].image;
  const products = data[0].categoryNameBn;
  const productslenth = data.length;



  return (
    <div>
      <div className="card bg-base-100 rounded-2xl p-3 sm:p-4 my-6 sm:my-10">
        <div className="flex gap-2 items-center">
          <div className="shrink-0">
            <div className="inline-block bg-green-50 border border-green-200 rounded-2xl px-2 py-1">
              <span className="text-base sm:text-lg">{image}</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl text-black font-bold wrap-break-word">
              {products}
            </p>
            <p className="text-[12px] sm:text-[14px] text-gray-400">
              {bnNumber(productslenth)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-[13px] sm:text-base text-gray-400 my-3">
          মোট {bnNumber(productslenth)}টি পণ্য দেখানো হচ্ছে
        </p>
        {/* <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn m-1 bg-white">
            <div className="flex gap-3">
              <p>
                ডিফল্ট <span className="text-[6px] text-gray-400">▼</span>
              </p>
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button onClick={downtoupfilter}>কম থেকে বেশি</button>
            </li>
            <li>
             <button onClick={uptodownfilter}>বেশি থেকে কম</button>
            </li>
          </ul>
        </div> */}
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((items) => (
          <Link key={items.id} href={`/detailpage/${items.id}`}>
            <div className="card bg-base-100 card-sm shadow-sm w-full">
              <div className="card-body p-3 sm:p-4">
                <div className="flex gap-2 items-center">
                  <div className="shrink-0">
                    <div className="inline-block bg-green-50 border border-green-200 rounded-2xl px-2 py-1">
                      <span className="text-base sm:text-lg">
                        {items?.image}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] sm:text-[18px] text-black font-bold truncate">
                      {items?.nameBn}
                    </p>
                    <span className="text-[12px] sm:text-[14px] font-normal text-black">
                      {" "}
                      প্রতি {getUnitBn(items?.unit)}
                    </span>
                  </div>
                </div>
                <p className="text-[12px] sm:text-[14px] text-black pt-1 sm:pt-2">
                  আজকের দাম
                </p>
                <div className="justify-between sm:justify-end card-actions items-center flex-wrap gap-1">
                  <p className="text-lg sm:text-2xl font-bold text-black pb-1 sm:pb-2">
                    {bnNumber(items?.today)} টাকা
                  </p>
                  <div className="w-fit rounded-lg bg-green-50 border border-green-200 px-1">
                    {items.change?.dir === "up" ? (
                      <p className="text-[11px] sm:text-[12px] font-bold text-red-500">
                        ▲ {bnNumber(items.change.pct)}%
                      </p>
                    ) : (
                      <p className="text-[11px] sm:text-[12px] font-bold text-[#05893e]">
                        ▼ {bnNumber(items.change?.pct)}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SelectItems;
