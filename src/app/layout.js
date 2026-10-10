import { Noto_Serif_Bengali } from "next/font/google";
import { Suspense } from "react";
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
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-green-50">
        <Nevber />

        <Suspense
          fallback={<div className="h-12 w-full" />}
        >
          <NebLink />
        </Suspense>

        <Marpuee />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="light"
        />

        <main className="flex-1 w-full max-w-7xl mx-auto pt-5 px-4">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}