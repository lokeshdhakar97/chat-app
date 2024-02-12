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
import Link from "next/link";
import { useState } from "react";

export default function Singup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    console.log(email, username, password);
  };

  return (
    <Card className="w-[550px] p-10">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Joining Together is the First Step to Endless Conversations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4 my-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" onChange={handleEmailChange} />
          </div>
        </div>
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
        <Button onClick={handleSignup}>Signup</Button>
        <div className="flex gap-2">
          <span>Already have an account</span>
          <Link href="/login" className="text-blue-700">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
