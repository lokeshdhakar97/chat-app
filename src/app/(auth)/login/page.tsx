import React from "react";
import Login from "./Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const isLoggedIn = cookies().get("token");
  if (isLoggedIn) {
    redirect("/");
  }
  return <Login />;
};

export default Page;
