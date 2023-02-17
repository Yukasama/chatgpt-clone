"use client";

import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};

export default function ChatLink({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages, loading] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`border-gray-600 ${
        active && "bg-gray-700/50"
      } border flex items-center justify-between rounded-lg px-5 py-3 text-sm 
      gap-4 cursor-pointer transition-all duration-200 ease-out hover:bg-gray-700`}>
      <div className="flex items-center gap-4">
        <ChatBubbleLeftIcon className="w-5 h-5 text-white" />
        <p className="text-white">
          {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
      </div>

      <TrashIcon
        onClick={removeChat}
        className="w-5 h-5 text-white hover:text-red-500"
      />
    </Link>
  );
}
