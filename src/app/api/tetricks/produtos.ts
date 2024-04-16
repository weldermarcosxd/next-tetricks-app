import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";

export async function obterProdutos() {
  const session = (await getServerSession(authOptions)) as Session;
  const baseUrl = process.env.TETRICKS_API_BASE_URL as string;
  const res = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "text/plain",
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch data ${res.status}`);

  return res.json();
}
