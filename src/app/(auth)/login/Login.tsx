"use client";
import { setUserCookies } from "@/app/action";
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
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data) {
      setUserCookies(data.token);
    }
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
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" onChange={handleEmailChange} />
          </div>
        </div>
        <div className="grid w-full items-center gap-4 my-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
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
