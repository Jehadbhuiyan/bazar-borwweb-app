"use client";
import Link from "next/link";
import { authClient, signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  NameField,
  PasswordField,
  WebsiteField,
  EmailField,
} from "@/app/component/commonfile/TextField";
import { Button, Form } from "@heroui/react";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const { error } = await signUp.email({
        name: data.name,
        email: data.email,
        image: data.url || undefined,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন করা সম্ভব হচ্ছে না!");
        setLoading(false);
        return;
      }

      toast.success("রেজিস্ট্রেশন সফল হয়েছে!");

      // full reload, tai Nevber notun session niye render hoy
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  const googlesigninhendle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const githubsigninhendle = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50/50 px-4 py-8">
      {/* heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-[13px] sm:text-[15px] text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* card */}
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-green-100 shadow-sm p-5 sm:p-8">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <NameField />
          <EmailField />
          <WebsiteField />
          <PasswordField />

          <div className="flex gap-2 pt-1">
            <Button
              isLoading={loading}
              isDisabled={loading}
              type="submit"
              className="flex-1 bg-[#05893e] hover:bg-[#046c31] text-white font-medium"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "রেজিস্টেশন করুন"
              )}
            </Button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[12px] sm:text-[13px] text-gray-500">
              অথবা
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* social */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={googlesigninhendle}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors px-3 py-2.5 text-[13px] sm:text-sm font-medium text-gray-800"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              google দিয়ে চালিয়ে যান
            </button>
            <button
              onClick={githubsigninhendle}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors px-3 py-2.5 text-[13px] sm:text-sm font-medium text-gray-800"
            >
              <span className="text-base">🐙</span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-[13px] sm:text-sm text-gray-700">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-[#05893e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Form>
      </div>

      <Link
        href="/"
        className="mt-5 text-[13px] sm:text-sm text-gray-600 hover:text-[#05893e] transition-colors"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUp;