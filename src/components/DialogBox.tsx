import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { getUserCookies } from "@/app/action";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export const DialogBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userNotFound, setUserNotFound] = useState(null);
  const { chat, setChat, setSelectedChat, loading, setLoading } =
    useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("runiiing");

      const token = await getUserCookies();
      try {
        const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?search=${searchQuery}`;
        const headers = {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${token}`,
        };
        const response = await fetch(uri, {
          headers: headers,
        });
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setUserNotFound(data.message);
          setFetchedUsers(data);
        } else {
          setLoading(false);
          alert(data?.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    const delaySearch = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchData();
      } else {
        setFetchedUsers([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  async function createOne2OneChat(userId: any) {
    const token = await getUserCookies();
    const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`;
    const myHeaders = {
      "Content-Type": "application/json",
      // prettier-ignore
      "Authorization": `Bearer ${token}`,
    };
    const response = await fetch(uri, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) alert("Something went wrong");
    const data = await response.json();
    if (!chat.find((c) => c._id === data.id)) setChat([data, ...chat]);
    setSelectedChat(data);
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full justify-between">
          <Button variant={"default"} className=" w-1/2">
            Add Chat
          </Button>
          <Button variant={"default"} className=" w-1/2">
            Join Room
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Type Chat ID </DialogTitle>
        </DialogHeader>
        <div className="qw-full">
          <Input
            id="chatid"
            placeholder="Start typing...."
            className="col-span-3 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DialogFooter>
          {loading ? (
            <div className="w-full">Loading...</div>
          ) : (
            <DialogClose asChild>
              {fetchedUsers.length > 0 && (
                <div className="w-full flex flex-col gap-2">
                  {fetchedUsers.map((user: any) => {
                    return (
                      // <Link href={`/chat/${user._id}`}>
                      <div
                        className="w-full bg-slate-100 border-2 border-gray-200 h-14 rounded-lg px-4 flex items-center cursor-pointer hover:bg-gray-200"
                        onClick={() => createOne2OneChat(user?._id)}
                      >
                        <div>
                          <h1 className="text-2xl">🔍</h1>
                        </div>
                        <div className="flex flex-col gap-0 px-1">
                          <h6 className="text-sm">{user.username}</h6>
                          <span className="text-xs">{user.email}</span>
                        </div>
                      </div>
                      // </Link>
                    );
                  })}
                </div>
              )}
            </DialogClose>
          )}

          {userNotFound && <div className="w-full">User not found</div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
