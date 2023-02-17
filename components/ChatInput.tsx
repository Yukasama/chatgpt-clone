"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";

type Props = {
  chatId: string;
};

export default function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const session = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!,
      },
    };
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent flex-1 focus:outline-none disabled:text-gray-500"
          type="text"
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message"
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] disabled:bg-gray-300
          hover:opacity-50 disabled:hover:opacity-100 text-white 
          font-bold px-4 py-2 rounded cursor-pointer disabled:cursor-auto">
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}
