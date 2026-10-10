import { bnNumber } from "@/app/component/commonfile/Tktextconvart";
import { getUnitBn } from "@/app/component/commonfile/Unitconvart";

const DetailsPage = async ({ params }) => {
  const { pageId } = await params;
  console.log(pageId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${pageId}`,
  );
  const data = await res.json();
  console.log("jehad", data);
  const lowestMarket = data.markets?.reduce((lowest, market) =>
    market.min < lowest.min ? market : lowest,
  );

  const uperMarket = data.markets?.reduce((lowest, market) =>
    market.max < lowest.max ? market : lowest,
  );
const avarageMark = Math.round(
  data.markets.reduce(
    (sum, elem) => sum + Number(elem.min) + Number(elem.max),
    0
  ) / (data.markets.length * 2)
);
  return (
    <div className="w-full">
      <div className="card bg-base-100 rounded-2xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-4 p-3 sm:p-4">
          {/* item name div */}
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-5 rounded-2xl min-w-0">
            <div className="shrink-0 bg-green-50 border border-green-200 rounded-2xl p-2.5 sm:p-4">
              <span className="text-3xl sm:text-5xl leading-none block">
                {data.image}
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight wrap-break-word">
                {data.nameBn}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[12px] sm:text-[13px]">
                <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                  প্রতি {getUnitBn(data.unit)}
                </span>
                <span className="text-gray-400">›</span>
                <span className="bg-green-50 text-[#05893e] border border-green-200 rounded-full px-2 py-0.5">
                  {data.categoryNameBn}
                </span>
              </div>

              <p className="mt-2 text-[12px] sm:text-sm text-gray-700">
                {data ? (
                  "গতকালের তুলনায় আজকে দাম একই আছে"
                ) : (
                  <>
                    গতকালের তুলনায় আজকে দাম{" "}
                    <span
                      className={`font-bold ${isUp ? "text-red-500" : "text-[#05893e]"}`}
                    >
                      {isUp ? "বেড়েছে" : "কমেছে"}
                    </span>{" "}
                    <span className="font-bold text-black">
                      {toBn(data.today)} টাকা
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* ajker red div */}
          <div className="bg-green-50 border border-green-100 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 w-full md:w-auto md:min-w-30 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-1">
              {/* Label */}
              <p className="text-[11px] text-gray-500 font-medium">আজকের দাম</p>

              {/* Price */}
              <p className="text-3xl sm:text-4xl font-bold text-black">
                {bnNumber(data.today)}
              </p>

              {/* Unit */}
              <p className="text-[10px] text-gray-400">টাকা / কেজি</p>

              {/* Change */}
              <div className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded-full mt-1">
                {data.change?.dir === "up" ? (
                  <p className="text-[11px] sm:text-[12px] font-bold text-red-500">
                    ▲ {bnNumber(data.change?.pct)}%
                  </p>
                ) : (
                  <p className="text-[11px] sm:text-[12px] font-bold text-[#05893e]">
                    ▲ {bnNumber(data.change?.pct)}%
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="m-3 py-2">
            <p className="text-black font-bold text-lg sm:text-xl md:text-2xl">
              দামের সারসংক্ষেপ
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2">
            {/* সর্বনিম্ন */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              {lowestMarket && (
                <>
                  <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

                  <h1 className="text-2xl font-bold text-green-600 mt-2">
                    {bnNumber(lowestMarket.min)} টাকা
                  </h1>

                  <p className="text-xs text-gray-400 mt-1">
                    সবচেয়ে কম দামের বাজার
                  </p>
                </>
              )}
            </div>

            {/* সর্বাধিক */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              {uperMarket && (
                <>
                  <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

                  <h1 className="text-2xl font-bold text-red-500 mt-2">
                    {bnNumber(uperMarket.max)} টাকা
                  </h1>

                  <p className="text-xs text-gray-400 mt-1">
                    সবচেয়ে বেশি দামের বাজার
                  </p>
                </>
              )}
            </div>

            {/* গড় */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <h1 className="text-2xl font-bold text-blue-600 mt-2">
                {bnNumber(avarageMark)} টাকা
              </h1>

              <p className="text-xs text-gray-400 mt-1">প্রতি কেজি হিসেবে</p>
            </div>
          </div>
          <div className="m-3 py-2">
            <p className="text-black font-bold text-lg sm:text-xl md:text-2xl">
              বাজারভিত্তিক আজকের দাম
            </p>
          </div>

          <table className="w-full min-w-130 text-left text-[12px] sm:text-sm">
            <thead className="bg-white text-gray-400">
              <tr>
                <th className="px-3 sm:px-5 py-2.5 font-bold whitespace-nowrap">
                  বাজার
                </th>
                <th className="px-3 sm:px-5 py-2.5 font-bold whitespace-nowrap">
                  বিভাগ
                </th>
                <th className="px-3 sm:px-5 py-2.5 font-bold text-right whitespace-nowrap">
                  সর্বনিম্ন
                </th>
                <th className="px-3 sm:px-5 py-2.5 font-bold text-right whitespace-nowrap">
                  সর্বোচ্চ
                </th>
                <th className="px-3 sm:px-5 py-2.5 font-bold text-right whitespace-nowrap">
                  গড়
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.markets?.map((m, i) => (
                <tr key={i} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-3 sm:px-5 py-2.5 font-medium text-gray-900 whitespace-nowrap">
                    {m.market}
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 text-gray-600 whitespace-nowrap">
                    {m.division}
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 text-right whitespace-nowrap">
                    {`${bnNumber(m.min)}  টাকা`}
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 text-right whitespace-nowrap">
                    {`${bnNumber(m.max)}  টাকা`}
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 text-right font-bold whitespace-nowrap">
                    {`${bnNumber(m.max + m.min / 2)}  টাকা`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
