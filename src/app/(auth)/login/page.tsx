"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log(data);
    router.replace("/");
  };

  return (
    <Card className="w-[550px] p-10">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          Your Conversations Await in the World of Together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4 my-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Username</Label>
            <Input id="user" type="text" onChange={handleUsernameChange} />
          </div>
        </div>
        <div className="grid w-full items-center gap-4 my-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-start flex-col gap-4">
        <Button onClick={handleLogin}>Login</Button>
        <div className="flex gap-2">
          <span>Create an account?</span>
          <Link href="/signup" className="text-blue-700">
            Signup
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
