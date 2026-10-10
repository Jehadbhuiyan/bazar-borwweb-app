
import { Suspense } from "react";
import { bnNumber } from "@/app/component/commonfile/Tktextconvart";
import { getUnitBn } from "@/app/component/commonfile/Unitconvart";


async function ProductContent({ params }) {
  const { pageId } = await params;
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${pageId}`);
  const data = await res.json()

  if (!data) {
    return (
      <p className="my-10 text-center text-gray-400">
        পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  const markets = Array.isArray(data.markets) ? data.markets : [];

  const lowestMarket = markets.length
    ? markets.reduce((a, b) =>
        Number(a.min) < Number(b.min) ? a : b
      )
    : null;

  const highestMarket = markets.length
    ? markets.reduce((a, b) =>
        Number(a.max) > Number(b.max) ? a : b
      )
    : null;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (sum, market) =>
            sum + Number(market.min) + Number(market.max),
          0
        ) / (markets.length * 2)
      )
    : null;

  const today = Number(data.today);
  const yesterday = Number(data.yesterday);
  const difference = Math.abs(today - yesterday);
  const priceUp = today > yesterday;

  return (
    <main className="w-full space-y-5">
      {/* Product details */}
      <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="shrink-0 rounded-2xl border border-green-200 bg-green-50 p-3 sm:p-4">
              <span className="text-4xl sm:text-5xl">
                {data.image || "🛒"}
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="wrap-break-word text-2xl font-bold text-gray-900 sm:text-3xl">
                {data.nameBn || "পণ্যের নাম"}
              </h1>

              <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                  প্রতি {getUnitBn(data.unit)}
                </span>

                <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-700">
                  {data.categoryNameBn || "অন্যান্য"}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {difference === 0 ? (
                  "গতকালের তুলনায় আজ দাম একই আছে।"
                ) : (
                  <>
                    গতকালের তুলনায় আজ দাম{" "}
                    <span
                      className={
                        priceUp
                          ? "font-bold text-red-500"
                          : "font-bold text-green-600"
                      }
                    >
                      {priceUp ? "বেড়েছে" : "কমেছে"}
                    </span>{" "}
                    <strong className="text-gray-900">
                      {bnNumber(difference)} টাকা
                    </strong>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Today's price */}
          <div className="rounded-2xl border border-green-100 bg-green-50 p-5 text-center md:min-w-40">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
              {bnNumber(today)}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              টাকা / {getUnitBn(data.unit)}
            </p>

            {data.change && (
              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                  data.change.dir === "up"
                    ? "bg-red-100 text-red-600"
                    : data.change.dir === "down"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {data.change.dir === "up"
                  ? "▲"
                  : data.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {bnNumber(data.change.pct)}%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
        <div className="p-4 sm:p-5">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            দামের সারসংক্ষেপ
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 px-4 pb-5 sm:grid-cols-3">
          <PriceCard
            title="সর্বনিম্ন দাম"
            price={lowestMarket?.min}
            market={lowestMarket?.market}
            color="text-green-600"
          />

          <PriceCard
            title="সর্বাধিক দাম"
            price={highestMarket?.max}
            market={highestMarket?.market}
            color="text-red-500"
          />

          <PriceCard
            title="গড় দাম"
            price={averagePrice}
            color="text-blue-600"
          />
        </div>

        {/* Market-wise prices */}
        <div className="px-4 pb-4 sm:px-5">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    বাজার
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    বিভাগ
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {markets.map((market, index) => {
                  const min = Number(market.min);
                  const max = Number(market.max);
                  const average = Math.round((min + max) / 2);

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="transition-colors hover:bg-green-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                        {market.market || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {market.division || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        {bnNumber(min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        {bnNumber(max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                        {bnNumber(average)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-4 pb-5 text-sm text-gray-400">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}

function PriceCard({ title, price, market, color }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 text-center">
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {price != null
          ? `${bnNumber(Number(price))} টাকা`
          : "তথ্য নেই"}
      </p>

      {market && (
        <p className="mt-2 text-xs text-gray-500">{market}</p>
      )}
    </div>
  );
}

function Loading() {
  return (
    <p className="my-10 text-center text-gray-400">
      পণ্যের তথ্য লোড হচ্ছে...
    </p>
  );
}

export default function DetailsPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
