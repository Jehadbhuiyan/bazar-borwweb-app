import { Suspense } from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { bnNumber } from "./commonfile/Tktextconvart";
import { getUnitBn } from "./commonfile/Unitconvart";

const MarpueeContent = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("বাজারের তথ্য লোড করা যায়নি");
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("API থেকে সঠিক পণ্যের তথ্য পাওয়া যায়নি");
  }

  return (
    <div className="bg-white py-1">
      <MarqueeText duration={15} direction="right">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 mx-4 whitespace-nowrap"
          >
            <span className="text-lg">{item.image}</span>

            <p className="text-[16px]">
              {item.nameBn} {bnNumber(item.today)} টাকা/
              {getUnitBn(item.unit)}
            </p>

            {item.change?.dir === "up" ? (
              <p className="text-[12px] font-bold text-red-500">
                ▲ {bnNumber(item.change.pct)}%
              </p>
            ) : (
              <p className="text-[12px] font-bold text-[#05893e]">
                ▼ {bnNumber(item.change?.pct ?? 0)}%
              </p>
            )}
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default function Marpuee() {
  return (
    <Suspense
      fallback={
        <div className="bg-white py-3 text-center text-sm text-gray-500">
          বাজারের তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <MarpueeContent />
    </Suspense>
  );
}