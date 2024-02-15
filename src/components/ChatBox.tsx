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

interface IChatBox {
  chatId?: any;
}
const ChatBox = ({ chatId }: IChatBox) => {
  const [chat, setChat] = useState([]);

  return (
    <div className="h-full w-9/12 bg-accent rounded-3xl relative bg-white border-2 flex justify-center items-center flex-col gap-2">
      {chat.length === 0 ? (
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
            <CardTitle>AlphaBI Solutions</CardTitle>
            <CardDescription>Chat ID: alphabi123</CardDescription>
          </CardHeader>
          <CardContent
            className="grid gap-1 bg-accent p-6 "
            style={{ height: "480px", overflowY: "scroll" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => {
              return (
                <div
                  key={key}
                  className="-mx-2 my-1 flex items-start space-x-4 h-16 rounded-md p-2 transition-all  cursor-pointer px-4"
                >
                  <ChatBubbleIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Lokesh Dhakar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Open to see messages
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="py-4 h-20 flex gap-4">
            <Textarea
              className="resize-none rounded-full px-9 py-2"
              placeholder="Write your message here"
            ></Textarea>
            <Button className="py-6 px-7">Send</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatBox;
