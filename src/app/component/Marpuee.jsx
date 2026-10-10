import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { bnNumber } from "./commonfile/Tktextconvart";
import { getUnitBn } from "./commonfile/Unitconvart";

const Marpuee = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();

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
              {item.nameBn} {bnNumber(item.today)} টাকা/{getUnitBn(item.unit)}
            </p>
            {item.change.dir === "up" ? (
              <p className="text-[12px] font-bold text-red-500">
                ▲ {bnNumber(item.change.pct)}%
              </p>
            ) : (
              <p className="text-[12px] font-bold text-[#05893e]">
                ▼ {bnNumber(item.change.pct)}%
              </p>
            )}
          </div>
        ))}
      
      </MarqueeText>
    </div>
  );
};

export default Marpuee;
