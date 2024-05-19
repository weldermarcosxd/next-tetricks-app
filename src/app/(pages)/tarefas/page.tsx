"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import useSWR from "swr";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import fetcher from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function TarefasPage() {
  const [pageIndex, setPageIndex] = useState(0);

  const session = useSession() as any;
  const myHeaders = new Headers([
    ["Autorization", `Bearer ${session.accessToken}`],
  ]);

  const configInit: RequestInit = {
    method: "GET",
    headers: myHeaders,
    cache: "default",
  };
  const { data, error, isLoading } = useSWR<any>(
    [process.env.TETRICKS_API_BASE_URL + "/Tarefas", configInit],
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const produtos = data.resultados as any[];

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Tarefas</CardTitle>
              <CardDescription>
                Gerencie as tarefas de maneira simples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Imagem</span>
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Completa
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Atualizado em
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Tenant ID
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Tarefa ID
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos.slice(0, 5).map((produto, i) => {
                    return (
                      <TableRow key={produto.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="https://dummyimage.com/30x30"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {produto.descricao}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {produto.completa ? "Sim" : "Não"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {produto.atualizadoEm}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {produto.tenantId}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {produto.id}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of{" "}
                <strong>{produtos.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
