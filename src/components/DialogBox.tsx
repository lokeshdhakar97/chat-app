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
  const [addUserIntoGroup, setAddUserIntoGroup] = useState<any>([]);
  const [roomName, setRoomName] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userNotFound, setUserNotFound] = useState(null);
  const { chat, setChat, setSelectedChat, loading, setLoading } =
    useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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
        setSearchQuery("");
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

  async function createRoomChat() {
    if (!roomName || addUserIntoGroup.length < 2) {
      alert("Room name and at least 2 users are required for group chat.");
      return;
    }

    const token = await getUserCookies();
    const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/room`;
    const myHeaders = {
      "Content-Type": "application/json",
      // prettier-ignore
      "Authorization": `Bearer ${token}`,
    };

    const requestBody = {
      roomName: roomName,
      users: JSON.stringify(addUserIntoGroup.map((u: any) => u.userId)),
    };

    const response = await fetch(uri, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (response.ok) {
      setChat([data, ...chat]);
      setSelectedChat(data);
    } else {
      alert(data?.error);
    }
  }

  function addUserToGroupHandler(userId: String, username: String) {
    if (addUserIntoGroup.find((c: any) => c.userId === userId)) {
      alert("User Already Added");
      return;
    }
    setAddUserIntoGroup((prevUser: any) => [...prevUser, { userId, username }]);
    setFetchedUsers([]);
    setSearchQuery("");
  }

  return (
    <div className="w-full flex gap-2 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"} className=" w-full">
            Add Chat
          </Button>
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
                {fetchedUsers?.length > 0 && (
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
                            <h6 className="text-sm">{user?.username}</h6>
                            <span className="text-xs">{user?.email}</span>
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"} className=" w-full">
            Add Room
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
          </DialogHeader>
          <div className="qw-full">
            <Input
              id="roomName"
              placeholder="Write Room Name"
              className="col-span-3 w-full"
              value={roomName}
              onChange={(e: any) => setRoomName(e.target.value)}
            />
          </div>
          <div className="qw-full">
            <Input
              id="chatid"
              placeholder="Add users by username"
              className="col-span-3 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full">
            <>
              {addUserIntoGroup.map((user: any) => {
                return (
                  <>
                    <div className="w-fit bg-green-100 px-3 rounded-xl">
                      {user?.username}
                    </div>
                  </>
                );
              })}
            </>
          </div>
          <DialogFooter>
            {loading ? (
              <div className="w-full">Loading...</div>
            ) : (
              <>
                {fetchedUsers.length > 0 && (
                  <div className="w-full flex flex-col gap-2">
                    {fetchedUsers?.map((user: any) => {
                      return (
                        // <Link href={`/chat/${user._id}`}>
                        <div
                          className="w-full bg-slate-100 border-2 border-gray-200 h-14 rounded-lg px-4 flex items-center cursor-pointer hover:bg-gray-200"
                          onClick={() =>
                            addUserToGroupHandler(user?._id, user?.username)
                          }
                        >
                          <div>
                            <h1 className="text-2xl">🔍</h1>
                          </div>
                          <div className="flex flex-col gap-0 px-1">
                            <h6 className="text-sm">{user?.username}</h6>
                            <span className="text-xs">{user?.email}</span>
                          </div>
                        </div>
                        // </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {userNotFound && <div className="w-full">User not found</div>}
          </DialogFooter>
          <div className="w-full">
            <DialogClose>
              <Button onClick={createRoomChat}>Create Room</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
