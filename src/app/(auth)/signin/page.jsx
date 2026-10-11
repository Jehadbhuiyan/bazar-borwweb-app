"use client";
import Link from "next/link";
import { Button, Form } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  EmailField,
  PasswordField,
} from "@/app/component/commonfile/TextField";
import { passwordValidate } from "@/app/component/commonfile/PasswordValidate";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!");
      setLoading(false);
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে!");

    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  } catch (err) {
    console.error(err);
    toast.error("লগইন করা সম্ভব হয়নি। আবার চেষ্টা করুন!");
    setLoading(false);
  }
};

  const googlesigninhendle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const githubsigninhendle = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50/50 px-4 py-8">
      {/* heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          সাইন ইন করুন
        </h1>
        <p className="mt-2 text-[13px] sm:text-[15px] text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* card */}
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-green-100 shadow-sm p-5 sm:p-8">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <EmailField />
          <PasswordField />

          <div className="flex gap-2 pt-1">
            <Button
              isLoading={loading}
              isDisabled={loading}
              type="submit"
              className="flex-1 bg-[#05893e] hover:bg-[#046c31] text-white font-medium"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                </>
              ) : (
                "লগিন করুন"
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
            অ্যাকাউন্ট নাই?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#05893e] hover:underline"
            >
              সাইন আপ করুন
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
