"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
};

export default function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", { fallbackData: "text-davinci-003" });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const createdAt = serverTimestamp();
    const message: Message = {
      text: input,
      createdAt: createdAt,
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || "/favicon.jpg",
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId: chatId,
        model: model,
        session: session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 m-4 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent flex-1 focus:outline-none disabled:text-gray-500 text-white"
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

      <div className="md:hidden mt-2">
        <ModelSelection />
      </div>
    </div>
  );
}
