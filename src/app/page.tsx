"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    let userAvatar = "avatar.svg";

    if (session.user?.image !== undefined)
      userAvatar = session.user?.image as string;

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
          <Image
            src={userAvatar}
            fill
            alt=""
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-full"
          />
        </div>
        <p className="text-2xl mb-2">
          Bem vindo <span className="font-bold">{session.user?.name}</span>.
          Logado como
        </p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button
          className="bg-red-600 py-2 px-6 rounded-md"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-2xl mb-2">Not Signed In</p>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
        onClick={() => signIn("keycloak")}
      >
        Sign in with keycloak
      </button>
    </div>
  );
}
