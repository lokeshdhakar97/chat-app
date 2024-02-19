import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { getUserCookies } from "@/app/action";
import { useAuthContext } from "@/context/AuthContext";
import showTime from "@/lib/helper";
import io from "socket.io-client";
import { Button } from "./ui/button";

const socket = io("http://localhost:5000");

const MessageBox = () => {
  const [message, setMessage] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, user } = useAuthContext();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  useEffect(() => {
    socket.on("res", (data) => {
      console.log("Check data");
      console.log(data);
    });
  });
  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const token = await getUserCookies();
      const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/message?chatId=${selectedChat._id}`;
      const myHeaders = {
        // prettier-ignore
        "Authorization": `Bearer ${token}`,
      };
      const response = await fetch(uri, {
        headers: myHeaders,
      });

      const data = await response.json();
      setMessage(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (e: any) => {
    if (e.key == "Enter" && newMessage) {
      const token = await getUserCookies();
      const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/message`;
      const myHeaders = {
        "Content-Type": "application/json",
        // prettier-ignore
        "Authorization": `Bearer ${token}`,
      };

      const requestBody = {
        content: newMessage,
        chatId: selectedChat._id,
      };
      setNewMessage(" ");

      const response = await fetch(uri, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage([...message, data]);
      } else {
        alert(data?.error);
      }
    }
  };

  function sayHello() {
    let data = "Hey Lokesh, How are you? ";
    socket.emit("say_hello", data);
  }

  return (
    <>
      <CardContent>
        <Button onClick={sayHello}>Say Hello</Button>
        <div className=" gap-1  border-t-2 border-gray-800 pt-3">
          {loading ? (
            <div className="w-full  h-[420px] flex justify-center items-center">
              {" "}
              <h2>Loading</h2>
            </div>
          ) : (
            <ScrollArea className="h-[420px]">
              <div className="w-full flex flex-col gap-2 px-8">
                {message?.map((msg: any, key: any) => {
                  return (
                    <div
                      key={key}
                      className={`-mx-2   mt-1 flex items-start space-x-4 rounded-md p-2 transition-all  cursor-pointer px-4 ${
                        msg?.sender?.username === user?.username
                          ? "self-end"
                          : "self-start"
                      }`}
                    >
                      <div className="space-y-1">
                        <p
                          className={`text-sm font-medium leading-none p-2 rounded-xl 
                          ${
                            msg?.sender?.username === user?.username
                              ? "bg-gray-200"
                              : "bg-black text-white"
                          }
                          `}
                        >
                          {msg.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {showTime(msg?.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
      <CardFooter className="py-4 h-20 flex gap-4">
        <Textarea
          onKeyDown={sendMessage}
          className="resize-none rounded-full px-9 py-2"
          placeholder="Write your message here"
          value={newMessage}
          onChange={typingHandler}
        ></Textarea>
      </CardFooter>
    </>
  );
};

export default MessageBox;
