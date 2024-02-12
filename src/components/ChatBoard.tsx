"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";
import { DialogBox } from "./DialogBox";

const ChatBoard = () => {

  return (
    <div className="w-screen h-screen bg-accent flex p-8 gap-4">
      <div className="h-full bg-accent w-3/12 rounded-3xl">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle>Chats</CardTitle>
            <CardDescription>Start Chatting, Start Connecting.</CardDescription>
            <DialogBox />
          </CardHeader>
          <CardContent className="grid gap-1">
            {[1, 2, 3, 5, 6].map((key) => {
              return (
                <div
                  key={key}
                  className="-mx-2 my-4 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer px-4"
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
        </Card>
      </div>
      <div className="h-full w-9/12 bg-accent rounded-3xl relative">
        <Card className="h-full">
          <CardHeader className="pb-3 h-20">
            <CardTitle>AlphaBI Solutions</CardTitle>
            <CardDescription>Chat ID: alphabi123</CardDescription>
          </CardHeader>
          <CardContent
            className="grid gap-1 bg-accent p-6 "
            style={{ height: "480px", overflowY: "scroll" }}
          >
            {[1, 2, 5, 6, 8, 5, 6, 3].map(() => {
              return (
                <div className="-mx-2 my-1 flex items-start space-x-4 h-16 rounded-md p-2 transition-all  cursor-pointer px-4">
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
      </div>
    </div>
  );
};

export default ChatBoard;
