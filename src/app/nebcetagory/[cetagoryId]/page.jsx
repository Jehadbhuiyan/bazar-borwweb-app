
import { Suspense } from "react";
import { bnNumber } from "@/app/component/commonfile/Tktextconvart";
import { getUnitBn } from "@/app/component/commonfile/Unitconvart";
import Link from "next/link";

async function CategoryProducts({ params }) {
  const { cetagoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(cetagoryId)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <p className="my-10 text-center text-red-500">
        পণ্যের তথ্য লোড করা যায়নি।
      </p>
    );
  }

  const data = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="my-10 text-center text-gray-400">
        কোনো পণ্য পাওয়া যায়নি
      </p>
    );
  }

  const { image, categoryNameBn } = data[0];
  const productCount = data.length;

  return (
    <div>
      <div className="card my-6 rounded-2xl bg-base-100 p-3 sm:my-10 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-2xl border border-green-200 bg-green-50 px-2 py-1">
            <span className="text-lg">{image || "🛒"}</span>
          </div>

          <div className="min-w-0">
            <h1 className="wrap-break-word text-xl font-bold text-black sm:text-2xl">
              {categoryNameBn || "পণ্যের ক্যাটাগরি"}
            </h1>

            <p className="text-xs text-gray-400 sm:text-sm">
              {bnNumber(productCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <p className="my-3 text-[13px] text-gray-400 sm:text-base">
        মোট {bnNumber(productCount)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/detailpage/${item.id}`}
            className="block"
          >
            <div className="card h-full bg-base-100 shadow-sm transition-shadow hover:shadow-md">
              <div className="card-body p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="shrink-0 rounded-2xl border border-green-200 bg-green-50 px-2 py-1">
                    <span className="text-lg">
                      {item.image || "🛒"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-[15px] font-bold text-black sm:text-lg">
                      {item.nameBn}
                    </h2>

                    <p className="text-xs text-gray-500 sm:text-sm">
                      প্রতি {getUnitBn(item.unit)}
                    </p>
                  </div>
                </div>

                <p className="pt-2 text-xs text-gray-500 sm:text-sm">
                  আজকের দাম
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="pb-1 text-lg font-bold text-black sm:text-2xl">
                    {bnNumber(item.today)} টাকা
                  </p>

                  {item.change && (
                    <div
                      className={`w-fit rounded-lg border px-2 py-1 ${
                        item.change.dir === "up"
                          ? "border-red-200 bg-red-50"
                          : item.change.dir === "down"
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <p
                        className={`text-[11px] font-bold sm:text-xs ${
                          item.change.dir === "up"
                            ? "text-red-500"
                            : item.change.dir === "down"
                              ? "text-[#05893e]"
                              : "text-gray-500"
                        }`}
                      >
                        {item.change.dir === "up"
                          ? "▲"
                          : item.change.dir === "down"
                            ? "▼"
                            : "—"}{" "}
                        {bnNumber(item.change.pct)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="py-12 text-center text-gray-500">
      পণ্যের তথ্য লোড হচ্ছে...
    </div>
  );
}

export default function SelectItems({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}
