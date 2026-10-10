const Loading = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">

        {/* Spinner */}
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-green-100"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#05893e] animate-spin"></div>

          <div className="absolute inset-2 rounded-full bg-green-50 flex items-center justify-center">
            <span className="text-2xl">৳</span>
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-5 text-lg sm:text-xl font-bold text-gray-800">
          তথ্য লোড হচ্ছে...
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          বাজার দর-এর সর্বশেষ তথ্য আনা হচ্ছে
        </p>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#05893e] animate-bounce"></span>
          <span
            className="w-2 h-2 rounded-full bg-[#05893e] animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-[#05893e] animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>

      </div>
    </main>
  );
};

export default Loading;