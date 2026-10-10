import React from "react";
import { getUnitBn } from "./commonfile/Unitconvart";
import Link from "next/link";
import { bnNumber } from "./commonfile/Tktextconvart";

const ProducCard = ({ topretprice }) => {
  return (
    <Link href={`/detailpage/${topretprice.id}`}>
      <div className="bg-white rounded-2x">
        <div className="card-body p-3 sm:p-4">
          <div className="flex gap-2 items-center">
            <div className="shrink-0">
              <div className="inline-block bg-green-50 border border-green-200 rounded-2xl px-2 py-1">
                <span className="text-base sm:text-lg">
                  {topretprice?.image}
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[15px] sm:text-[18px] text-[#05893e] font-bold truncate">
                {topretprice?.nameBn}
              </p>
              <span className="text-[14px] font-normal text-[#05893e]">
                {" "}
                প্রতি {getUnitBn(topretprice?.unit)}
              </span>
            </div>
          </div>
          <p className="text-[12px] sm:text-[14px] text-[#05893e] pt-1 sm:pt-2">
            আজকের দাম
          </p>
          <div className="justify-between sm:justify-end card-actions items-center flex-wrap gap-1">
            <p className="text-lg sm:text-2xl font-bold text-[#05893e] pb-1 sm:pb-2">
              {bnNumber(topretprice?.today)} টাকা
            </p>
            <div className="w-fit rounded-lg bg-green-50 border border-green-200 px-1">
              {topretprice.change?.dir === "up" ? (
                <p className="text-[11px] sm:text-[12px] font-bold text-red-500">
                  ▲ {bnNumber(topretprice.change.pct)}%
                </p>
              ) : (
                <p className="text-[11px] sm:text-[12px] font-bold text-[#05893e]">
                  ▼ {bnNumber(topretprice.change?.pct)}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProducCard;
