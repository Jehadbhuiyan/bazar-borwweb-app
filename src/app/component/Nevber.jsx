"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Nevber = () => {
  const [today, setToday] = useState("");

  const { data: session } = authClient.useSession();

  // বাংলাদেশের তারিখ
  useEffect(() => {
    const date = new Date().toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setToday(date);
  }, []);

  // Logout function
  const logoutHandle = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি");
        return;
      }

      toast.success("লগআউট হয়েছে");
    } catch (error) {
      toast.error("লগআউট করার সময় সমস্যা হয়েছে");
    }
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto items-center justify-between gap-2 pt-3 sm:pt-5 px-3 sm:px-4">
      {/* Logo এবং তারিখ */}
      <div className="flex gap-2 sm:gap-3 items-center min-w-0">
        <div className="bg-[#05893e] p-1 rounded-sm shrink-0">
          <Image
            className="p-1 m-0.5 sm:m-1 w-4 h-4 sm:w-5 sm:h-5"
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            height={20}
            width={20}
          />
        </div>

        <div className="min-w-0">
          <h1 className="text-base sm:text-xl font-bold text-gray-900">
            বাজার দর
          </h1>

          <p
            suppressHydrationWarning
            className="text-[10px] sm:text-xs text-gray-500 truncate"
          >
            {today}
          </p>
        </div>
      </div>

      {/* Login অথবা User Profile */}
      {session?.user ? (
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Avatar */}
          <div className="avatar shrink-0">
            <div className="mask mask-squircle w-9 h-9 sm:w-10 sm:h-10 relative overflow-hidden">
              <img
                src={session.user.image || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Name */}
          <div className="text-xs sm:text-sm font-medium text-gray-800 truncate max-w-20 sm:max-w-32">
            {session.user.name}
          </div>

          {/* Dropdown */}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="প্রোফাইল মেনু"
              className="cursor-pointer p-1"
            >
              <span className="text-xs text-gray-400">▼</span>
            </div>

            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 sm:w-60 p-2 shadow-md border border-gray-100"
            >
              {/* User Information */}
              <li className="pointer-events-none">
                <div className="flex flex-col items-start gap-1 min-w-0">
                  <span className="font-bold text-gray-900 truncate w-full">
                    {session.user.name}
                  </span>

                  <span className="text-xs text-gray-500 truncate w-full">
                    {session.user.email}
                  </span>
                </div>
              </li>

              {/* Profile Update */}
              <li>
                <Link href="/profilePage">
                  <span>প্রোফাইল আপডেট</span>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <button
                  className="text-red-500"
                  onClick={logoutHandle}
                >
                  ➥ সাইন আউট
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* Sign In / Sign Up */
        <div className="flex gap-1.5 sm:gap-2 shrink-0">
          <Link href="/signin">
            <button className="btn btn-sm sm:btn-md">
              Sign in
            </button>
          </Link>

          <Link href="/signup">
            <button className="btn btn-success btn-sm sm:btn-md">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nevber;