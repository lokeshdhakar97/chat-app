"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DialogBox } from "./DialogBox";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { getUserCookies, removeUserCookies } from "@/app/action";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

interface IAllChats {
  chatId?: any;
}

const AllChats = ({ chatId }: IAllChats) => {
  const [loading, setLoading] = useState(false);
  const { user, chat, setChat, setSelectedChat } = useAuthContext();
  const router = useRouter();
  console.log(chat, "chat");

  const getSenderName = (loggedInUser: any, u: any) => {
    if (loggedInUser?._id === u[0]?._id) {
      return u[1]?.username;
    }
    return u[0]?.username;
  };

  const fetchAllChats = async () => {
    try {
      setLoading(true);
      const token = await getUserCookies();
      const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`;
      const headers = {
        "Content-Type": "application/json",
        // prettier-ignore
        "Authorization": `Bearer ${token}`,
      };
      const response = await fetch(uri, {
        headers: headers,
      });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setChat(data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  function logoutHandle() {
    localStorage.removeItem("token");
    removeUserCookies();
    router.replace("/login");
  }

  return (
    <div className="h-full bg-accent w-3/12 rounded-3xl">
      <Card className="h-full">
        <div className="w-full pt-2 flex justify-between px-4 my-2 items-center">
          <h2 className="font-semibold">Together</h2>
          <Button onClick={logoutHandle}>Logout</Button>
        </div>
        <CardHeader className="pb-3">
          <CardTitle>Chats</CardTitle>
          <CardDescription>Start Chatting, Start Connecting.</CardDescription>
          <DialogBox />
        </CardHeader>
        <CardContent className="grid gap-1">
          {loading && <p>Loading...</p>}
          <ScrollArea className="h-[440px]">
            {chat.length > 0 ? (
              chat.map((chat: any) => {
                return (
                  <Link href={`/chat/${chat?._id}`}>
                    <div
                      key={chat?._id}
                      onClick={() => setSelectedChat(chat)}
                      className={`my-4 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer px-4 ${
                        chatId === chat?._id &&
                        "bg-black text-white rounded-2xl hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {chat.isGroupChat ? (
                        <ChatBubbleIcon className="mt-px h-5 w-5" />
                      ) : (
                        <PersonIcon className="mt-px h-5 w-5" />
                      )}

                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {chat.isGroupChat
                            ? chat.chatName
                            : getSenderName(user, chat.users)}
                        </p>
                        <p className="text-sm text-muted-foreground text-green-600">
                          {chat.latestMessage?.content
                            ? chat.latestMessage?.content
                            : "No message yet"}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="w-full text-center mt-4">
                No Chats and Room Available
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllChats;
