import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function obterProdutos() {
  const session = (await getServerSession(authOptions)) as Session;
  const baseUrl = process.env.TETRICKS_API_BASE_URL as string;
  const res = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "text/plain",
    },
  });

  if (res.status == 401) {
    signOut();
    redirect("/");
  }

  console.log(res.status);

  if (!res.ok) throw new Error(`Failed to fetch data ${res.status}`);

  return res.json();
}
