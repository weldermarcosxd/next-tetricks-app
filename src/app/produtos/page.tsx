import { obterProdutos } from "../api/tetricks/produtos";

export default async function Produtos() {
  const produtos = (await obterProdutos()).resultados as any[];

  return (
    <div className="w-full h-screen flex flex-col items-center my-40">
      <h1 className="my-4 text-7xl">Produtos</h1>
      {produtos.map((produto, i) => {
        return <div key={i}>{produto.descricao}</div>;
      })}
    </div>
  );
}
