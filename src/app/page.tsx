import ChatDashboard from "@/components/ChatDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Home() {
  const isLoggedIn = cookies().get("token");
  if (!isLoggedIn) {
    redirect("/login");
  }
  return <ChatDashboard />;
}
