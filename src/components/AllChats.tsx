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
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { getUserCookies } from "@/app/action";
import { useAuthContext } from "@/context/AuthContext";

const AllChats = () => {
  const [allChats, setAllChats] = useState([]);
  const { user } = useAuthContext();

  const fetchAllChats = async () => {
    try {
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
      const data = await response.json();
      setAllChats(data);
    } catch (error) {
      console.log("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <div className="h-full bg-accent w-3/12 rounded-3xl">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle>Chats</CardTitle>
          <CardDescription>Start Chatting, Start Connecting.</CardDescription>
          <DialogBox />
        </CardHeader>
        <CardContent className="grid gap-1">
          {allChats.map((data: any) => {
            return (
              <div
                key={data._id}
                className="-mx-2 my-4 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer px-4"
              >
                <ChatBubbleIcon className="mt-px h-5 w-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {
                      data.users.filter((user: any) => user._id !== user._id)
                        .username
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Open to see messages
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllChats;
