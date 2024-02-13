"use server";

import { cookies } from "next/headers";

export async function setUserCookies(token) {
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });
}
