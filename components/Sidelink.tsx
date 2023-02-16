import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

type Props = {
  title: string;
  icon: JSX.Element;
};

export default function Sidelink({ title, icon }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"), {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };
  return (
    <div
      onClick={createNewChat}
      className="border-gray-600 border flex items-center rounded-lg px-5 py-3 text-sm 
      gap-4 cursor-pointer transition-all duration-200 ease-out hover:bg-gray-800">
      <i className="w-5 h-5 text-white">{icon}</i>
      <p className="text-white">{title}</p>
    </div>
  );
}
