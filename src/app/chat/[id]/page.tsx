import AllChats from "@/components/AllChats";
import ChatBox from "@/components/ChatBox";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-screen h-screen bg-accent flex p-8 gap-4">
      <AllChats chatId={params.id} />
      <ChatBox chatId={params.id} />
    </div>
  );
}
