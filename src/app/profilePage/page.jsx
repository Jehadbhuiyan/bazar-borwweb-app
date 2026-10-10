
"use client"

import React from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const name = data.name?.toString().trim();
    const image = data.url?.toString().trim();

    if (!name || name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }

    try {
      const { data: updatedData, error } =
        await authClient.updateUser({
          name,
          image: image || null,
        });

      if (error) {
        toast.error(error.message || "Profile update করা যায়নি");
        return;
      }

      toast.success("Profile successfully updated");
      console.log(updatedData);
    } catch (error) {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error(error);
    }
  };

  if (isPending) {
    return (
      <div className="p-6 text-center">
        Profile loading...
      </div>
    );
  }

  const user = session?.user;
  const firstLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="grid gap-4 pt-3">
      {/* Heading */}
      <div className="px-6">
        <h1 className="text-3xl md:text-4xl text-black font-bold">
          আমার প্রোফাইল
        </h1>

        <p className="text-gray-700 text-base md:text-xl mt-2">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-base-100 p-5 mx-6 rounded-2xl shadow-sm flex sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {/* Profile Image / First Letter */}
          <div className="w-20 h-20 shrink-0 rounded-full bg-green-600 flex items-center justify-center overflow-hidden text-white">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-full h-full object-cover"
            
              />
            ) : null}

            <span
              className="w-full h-full items-center justify-center text-3xl font-bold"
              style={{ display: user?.image ? "none" : "flex" }}
            >
              {firstLetter}
            </span>
          </div>

          {/* User Information */}
          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 ">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-500 break-all">
              {user?.email || "Email পাওয়া যায়নি"}
            </p>
          </div>
        </div>

        {/* Sign Out */}
        <div>
          <Button
          className='btn btn-outline btn-error'
          onPress={async () => {
            const { error } = await authClient.signOut();

            if (error) {
              toast.error(error.message || "Sign out করা যায়নি");
              return;
            }

            toast.success("Successfully signed out");
            window.location.href = "/signin";
          }}
        >
          সাইন আউট
        </Button>
        </div>
      </div>

      {/* Update Form */}
      <div className="bg-base-100 p-6 mx-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-5">
         প্রোফাইন আপডেট করুন 
        </h2>

        <Form
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          {/* Name */}
          <TextField
            isRequired
            name="name"
            className="w-full"
            defaultValue={user?.name || ""}
            validate={(value) => {
              if (!value || value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }

              return null;
            }}
          >
            <Label>নাম</Label>

            <Input
              placeholder="আপনার নাম লিখুন"
              className="w-full"
            />

            <FieldError />
          </TextField>

          {/* Image URL */}
          <TextField
            name="url"
            className="w-full"
            defaultValue={user?.image || ""}
          >
            <Label>Profile Image URL (ঐচ্ছিক)</Label>

            <Input
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />

            <FieldError />
          </TextField>

          <div className="flex justify-center w-full">
            <Button
              type="submit"
              className="bg-green-600 text-white font-semibold"
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;

