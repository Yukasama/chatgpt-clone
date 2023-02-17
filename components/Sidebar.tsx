"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatLink from "./ChatLink";
import Sidelink from "./Sidelink";
import Loader from "./Loader";
import { collection, query, orderBy } from "firebase/firestore";
import ModelSelection from "./ModelSelection";

export default function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div
      className="p-3 flex flex-col h-screen bg-[#202123] min-w-[165px] max-w-xs 
    overflow-y-auto md:w-[300px] overflow-x-hidden gap-2 duration-200" style={{transition: "width 0.2s"}}>
      <div className="flex flex-col gap-4 h-full">
        <Sidelink title="New Chat" icon={<PlusIcon />} />

        <div className="hidden sm:inline">
          <ModelSelection />
        </div>

        <div className="flex flex-col justify-between h-full gap-2">
          <div className="flex-1">
            {loading && <Loader />}
            <div className="flex flex-col gap-2">
              {chats?.docs.map((chat) => (
                <ChatLink key={chat.id} id={chat.id} />
              ))}
            </div>
          </div>
          {session && (
            <div
              onClick={() => signOut()}
              className="flex items-center gap-3 py-2 rounded-lg px-4 cursor-pointer border border-gray-600 hover:bg-gray-700/50"
              title="Logout">
              <img
                className="rounded-full h-8 w-8"
                src={session.user?.image!}
                alt="User Logo"
              />
              <p className="text-white">Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
