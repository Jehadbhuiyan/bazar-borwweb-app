import { Suspense } from "react";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Nevber from "./component/Nevber";
import NebLink from "./component/NebLink";
import Marpuee from "./component/Marpuee";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";

const hindSiliguri = Noto_Serif_Bengali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-green-50">
        <Suspense
          fallback={
            <div className="w-full max-w-7xl mx-auto pt-3 sm:pt-5 px-3 sm:px-4 h-14" />
          }
        >
          <Nevber />
        </Suspense>

        <Suspense fallback={<div className="h-12" />}>
          <NebLink />
        </Suspense>

        <Suspense fallback={<div className="h-10 bg-white" />}>
          <Marpuee />
        </Suspense>

        <ToastContainer position="top-center" autoClose={3000} theme="light" />

        <main className="flex-1 w-full max-w-7xl mx-auto pt-5 px-4">
          <Suspense
            fallback={
              <p className="py-10 text-center text-gray-400">লোড হচ্ছে...</p>
            }
          >
            {children}
          </Suspense>
        </main>

        <Footer />
      </body>
    </html>
  );
}