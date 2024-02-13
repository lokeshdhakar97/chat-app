import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Signup from "./Signup";

const SignUp = () => {
  const isLoggedIn = cookies().get("token");
  if (isLoggedIn) {
    redirect("/");
  }
  return <Signup />;
};

export default SignUp;
