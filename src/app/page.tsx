import AllChats from "@/components/AllChats";
import ChatBox from "@/components/ChatBox";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Home() {
  const isLoggedIn = cookies().get("token");
  if (!isLoggedIn) {
    redirect("/login");
  }
  return (
    <div className="w-screen h-screen bg-accent flex p-8 gap-4">
      <AllChats />
      <ChatBox />
    </div>
  );
}
