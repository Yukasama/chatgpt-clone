"use client";

import { DocumentIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { collection } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Sidelink from "./Sidelink";

export default function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session.user?.email!, "chats")
  );

  return (
    <div
      className="p-2 flex flex-col h-screen bg-[#202123] min-w-[175px] max-w-xs 
    overflow-y-auto md:min-w-[300px] gap-2">
      <Sidelink title="New Chat" icon={<PlusIcon />} />
      {session && (
        <div
          onClick={() => signOut()}
          className="flex items-center gap-3 py-2 rounded-lg px-4 cursor-pointer border border-gray-600"
          title="Logout">
          <img
            className="rounded-full h-8 w-8"
            src={session.user?.image!}
            alt="User Logo"
          />
          <p className="text-white">Logout</p>
        </div>
      )}
      {chats?.docs.map((chat) => (
        <Sidelink key={chat.id} title="Chat" to="/" icon={<DocumentIcon />} />
      ))}
    </div>
  );
}
