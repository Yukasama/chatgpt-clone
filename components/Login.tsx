"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import Image from "next/image";
export default function Login() {
  return (
    <div
      className="bg-[#11A37F] h-screen flex flex-col items-center justify-center
      text-center gap-3">
      <Image
        className="invert"
        src="/chatgpt.png"
        width={100}
        height={100}
        alt="logo"
      />
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2">
        <p className="text-white font-bold text-[20px]">
          Sign In to use ChatGPT
        </p>
        <span>
          <ArrowRightCircleIcon className="text-white h-10 w-10" />
        </span>
      </button>
    </div>
  );
}
