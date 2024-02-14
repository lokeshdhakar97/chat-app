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

export async function removeUserCookies() {
  cookies().remove("token");
}

export async function getUserCookies() {
  return cookies().get("token").value;
}
``;
