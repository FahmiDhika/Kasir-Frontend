"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full min-h-dvh flex justify-center items-center bg-[#FFFDF6] text-center px-14 lg:px-56">
      <div className="w-full">
        <h1 className="text-5xl tracking-widest py-2 px-4 mb-2 lg:mb-7">
          <span className="text-[#A0C878] text-6xl font-bold italic lg:border-b-4">
            KASIR
          </span>{" "}
          Mura 5
        </h1>
        <p className="text-xl font-bold tracking-wide mb-14">
          silahkan login terlebih dahulu yaaa.
        </p>

        <button
          onClick={() => router.push(`/login`)}
          className="w-full lg:w-1/4 bg-[#DDEB9D] py-4 rounded-full shadow-xl cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
