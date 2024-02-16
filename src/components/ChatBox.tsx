"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useAuthContext } from "@/context/AuthContext";
import MessageBox from "./MessageBox";

interface IChatBox {
  chatId?: any;
}
const ChatBox = ({ chatId }: IChatBox) => {
  const { selectedChat, user } = useAuthContext();

  const getSenderName = (loggedInUser: any, u: any) => {
    if (loggedInUser?._id === u[0]._id) {
      return u[1].username;
    }
    return u[0].username;
  };
  return (
    <div className="h-full w-9/12 bg-accent rounded-3xl relative bg-white border-2 flex justify-center items-center flex-col gap-2">
      {!selectedChat ? (
        <>
          <h1 className="text-5xl">📨</h1>
          <span className="font-bold">No Chat Open</span>
          <p className="w-[400px] text-center text-sm">
            Begin your chatting experience by opening your chat. Share thoughts,
            laughter, and memories with others in your personalized chat space.
          </p>
        </>
      ) : (
        <Card className="h-full w-full">
          <CardHeader className="pb-3 h-20">
            <CardTitle>
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : getSenderName(user, selectedChat.users)}
            </CardTitle>
            <CardDescription>
              {selectedChat.isGroupChat ? "ROOM" : "One2One"}
            </CardDescription>
          </CardHeader>
          <MessageBox/>
        </Card>
      )}
    </div>
  );
};

export default ChatBox;
