"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const issuerUrl = process.env.REACT_APP_KEYCLOAK_ISSUER;
  const pathname = usePathname();
  console.log(pathname);

  return (
    <header className="sticky top-0 z-30 body-font bg-white">
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
            className={
              (session ? "p-2" : "p-2 pointer-events-none opacity-50") +
              (pathname == "/produtos" ? " bg-gray-500/10 rounded" : "")
            }
            href="/produtos"
          >
            Produtos
          </Link>
          <Link
            aria-disabled={session == null}
            className={
              (session ? "p-2" : "p-2 pointer-events-none opacity-50") +
              (pathname == "/tarefas" ? " bg-gray-500/10 rounded" : "")
            }
            href="/tarefas"
          >
            Tarefas
          </Link>
          <Link
            aria-disabled={session == null}
            className={
              (session ? "p-2" : "p-2 pointer-events-none opacity-50") +
              (pathname == "/sobre" ? " bg-gray-500/10 rounded" : "")
            }
            href="/sobre"
          >
            Sobre
          </Link>
        </nav>
        {session ? (
          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        session.user?.image || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link
                  href={issuerUrl + "/account"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DropdownMenuItem>Minha conta</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
