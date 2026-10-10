import React from "react";
import ProductCard from "./ProductCard";

const Allproducts = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const json = await res.json();
  const data = Array.isArray(json) ? json : [];

  const topretprice = data
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const lowerPrice = data
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const gridClass =
    "grid grid-cols-2 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-2";

  return (
    <div className="py-6 sm:py-8">
      <div className="flex gap-1 pb-2">
        <p className="text-red-500">▲</p>
        <p className="text-base sm:text-[18px] text-[#05893e] font-bold">
          আজ দাম বেড়েছে
        </p>
      </div>
      <div className={gridClass}>
        {topretprice.map((product) => (
          <ProductCard key={product.id} topretprice={product} />
        ))}
      </div>

      <div className="flex gap-1 pt-5 pb-2">
        <p className="text-[#05893e]">▼</p>
        <p className="text-base sm:text-[18px] text-[#05893e] font-bold">
          আজ দাম কমেছে
        </p>
      </div>
      <div className={gridClass}>
        {lowerPrice.map((product) => (
          <ProductCard key={product.id} topretprice={product} />
        ))}
      </div>

      <div className="flex gap-1 pt-5 pb-2">
        <p className="text-base sm:text-[18px] text-[#05893e] font-bold">
          সব পণ্য
        </p>
      </div>
      <div className={gridClass}>
        {data.map((product) => (
          <ProductCard key={product.id} topretprice={product} />
        ))}
      </div>
    </div>
  );
};

export default Allproducts;
