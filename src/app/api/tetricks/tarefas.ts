import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import { redirect } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";

export async function obterTarefas() {
  const session = (await getServerSession(authOptions)) as Session;
  const baseUrl = process.env.TETRICKS_API_BASE_URL as string;
  const res = await fetch(baseUrl + "/Tarefa", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "text/plain",
    },
  });

  if (res.status == 401) {
    redirect("/logout");
  }

  if (!res.ok) throw new Error(`Failed to fetch data ${res.status}`);

  return res.json();
}

export default function api(req: NextApiRequest, res: NextApiResponse) {
  return obterTarefas();
}
