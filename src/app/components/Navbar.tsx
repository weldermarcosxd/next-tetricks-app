"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tetricks</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link className="p-2" href="/">
            Home
          </Link>
          <Link
            aria-disabled={session == null}
            className={session ? "p-2" : "p-2 pointer-events-none opacity-50"}
            href="/produtos"
          >
            Produtos
          </Link>
        </nav>
        {session ? (
          <button
            className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
            onClick={() => signOut()}
          >
            Sair
          </button>
        ) : (
          <button
            className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
            onClick={() => signIn("keycloak")}
          >
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}
