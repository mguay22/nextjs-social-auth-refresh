"use server";

import { redirect } from "next/navigation";
import { getAuthCookie } from "../auth-cookie";
import { cookies } from "next/headers";

export default async function login(_prevState: any, formData: FormData) {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  if (!res.ok) {
    return { error: "Credentials are not valid." };
  }
  const cookie = getAuthCookie(res);
  if (cookie?.accessToken) {
    cookies().set(cookie.accessToken);
  }
  if (cookie?.refreshToken) {
    cookies().set(cookie.refreshToken);
  }
  redirect("/");
}
