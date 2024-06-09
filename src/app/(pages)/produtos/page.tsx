import { obterProdutos } from "@/api/tetricks/tarefas";
import "./style.css";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

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

export default async function ProdutosPage() {
  const resultado = await obterProdutos();
  const produtos = resultado.resultados as any[];

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <CardDescription>
                Gerencie os produtos de maneira simples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Sequencial</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Valor Unitário
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Criado Em
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Atualizado Em
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Ações</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos.map((produto, i) => {
                    return (
                      <TableRow key={produto.id}>
                        <TableCell className="celulaDoCorpo hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="30"
                            src="https://dummyimage.com/30x30"
                            width="30"
                          />
                        </TableCell>
                        <TableCell className="celulaDoCorpo">
                          {produto.sequencial}
                        </TableCell>
                        <TableCell className="celulaDoCorpo">
                          {produto.descricao}
                        </TableCell>
                        <TableCell className="celulaDoCorpo hidden md:table-cell">
                          {produto.valorUnitario}
                        </TableCell>
                        <TableCell className="celulaDoCorpo hidden md:table-cell">
                          {produto.criadoEm}
                        </TableCell>
                        <TableCell className="celulaDoCorpo hidden md:table-cell">
                          {produto.atualizadoEm}
                        </TableCell>
                        <TableCell className="celulaDoCorpo">
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
                <strong>{resultado.quantidadeDeRegistros}</strong> products
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
